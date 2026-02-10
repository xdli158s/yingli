import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/*', cors());

// 玩法配置
const BET_TYPES = {
  // 直接投注特码
  DIRECT: { name: '特码直投', odds: 47, numbers: (value) => [parseInt(value)] },
  
  // 大小：大(25-49) 小(01-24)
  SIZE: { 
    name: '大小', 
    odds: 47 / 25,
    numbers: (value) => {
      if (value === '大') return Array.from({length: 25}, (_, i) => i + 25);
      if (value === '小') return Array.from({length: 24}, (_, i) => i + 1);
      return [];
    }
  },
  
  // 单双
  ODD_EVEN: {
    name: '单双',
    odds: 47 / 25,
    numbers: (value) => {
      const all = Array.from({length: 49}, (_, i) => i + 1);
      if (value === '单') return all.filter(n => n % 2 === 1);
      if (value === '双') return all.filter(n => n % 2 === 0);
      return [];
    }
  },
  
  // 尾大尾小：尾大(5-9) 尾小(0-4)
  TAIL_SIZE: {
    name: '尾大尾小',
    odds: 47 / 25,
    numbers: (value) => {
      const all = Array.from({length: 49}, (_, i) => i + 1);
      if (value === '尾大') return all.filter(n => n % 10 >= 5);
      if (value === '尾小') return all.filter(n => n % 10 < 5);
      return [];
    }
  }
};

// 获取当前期数
app.get('/api/current-period', async (c) => {
  const db = c.env.DB;
  const period = await db.prepare(
    'SELECT * FROM periods WHERE status = ? ORDER BY id DESC LIMIT 1'
  ).bind('open').first();
  
  if (!period) {
    return c.json({ error: 'No active period' }, 404);
  }
  
  return c.json(period);
});

// 创建新期数
app.post('/api/periods', async (c) => {
  const db = c.env.DB;
  const { period_number } = await c.req.json();
  
  const result = await db.prepare(
    'INSERT INTO periods (period_number, status) VALUES (?, ?)'
  ).bind(period_number, 'open').run();
  
  return c.json({ id: result.meta.last_row_id, period_number });
});

// 提交投注
app.post('/api/bets', async (c) => {
  const db = c.env.DB;
  const { period_id, player_name, bet_type, bet_value, amount } = await c.req.json();
  
  // 检查期数状态
  const period = await db.prepare('SELECT status FROM periods WHERE id = ?').bind(period_id).first();
  if (!period || period.status !== 'open') {
    return c.json({ error: '当前期数不接受投注' }, 400);
  }
  
  const betConfig = BET_TYPES[bet_type];
  if (!betConfig) {
    return c.json({ error: 'Invalid bet type' }, 400);
  }
  
  const numbers = betConfig.numbers(bet_value);
  if (numbers.length === 0) {
    return c.json({ error: '无效的投注内容' }, 400);
  }
  
  const odds = betConfig.odds;
  
  await db.prepare(
    'INSERT INTO bets (period_id, player_name, bet_type, bet_value, amount, odds, equivalent_numbers) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(period_id, player_name || '匿名', bet_type, bet_value, amount, odds, JSON.stringify(numbers)).run();
  
  return c.json({ success: true, odds, numbers });
});

// 获取特码投注统计
app.get('/api/periods/:id/stats', async (c) => {
  const db = c.env.DB;
  const periodId = c.req.param('id');
  
  const bets = await db.prepare(
    'SELECT * FROM bets WHERE period_id = ?'
  ).bind(periodId).all();
  
  // 计算每个特码的总投注额（等效）
  const stats = {};
  for (let i = 1; i <= 49; i++) {
    stats[i] = { number: i, total_amount: 0, potential_payout: 0 };
  }
  
  bets.results.forEach(bet => {
    const numbers = JSON.parse(bet.equivalent_numbers);
    const amountPerNumber = bet.amount / numbers.length;
    
    numbers.forEach(num => {
      stats[num].total_amount += amountPerNumber;
      stats[num].potential_payout += amountPerNumber * 47; // 特码赔率固定47
    });
  });
  
  return c.json(Object.values(stats));
});

// 封盘
app.post('/api/periods/:id/close', async (c) => {
  const db = c.env.DB;
  const periodId = c.req.param('id');
  
  await db.prepare(
    'UPDATE periods SET status = ?, closed_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind('closed', periodId).run();
  
  return c.json({ success: true });
});

// 获取投注记录
app.get('/api/periods/:id/bets', async (c) => {
  const db = c.env.DB;
  const periodId = c.req.param('id');
  
  const bets = await db.prepare(
    'SELECT * FROM bets WHERE period_id = ? ORDER BY created_at DESC'
  ).bind(periodId).all();
  
  return c.json(bets.results);
});

// 删除投注
app.delete('/api/bets/:id', async (c) => {
  const db = c.env.DB;
  const betId = c.req.param('id');
  
  await db.prepare('DELETE FROM bets WHERE id = ?').bind(betId).run();
  
  return c.json({ success: true });
});

// 开奖并结算
app.post('/api/periods/:id/result', async (c) => {
  const db = c.env.DB;
  const periodId = c.req.param('id');
  const { result_number } = await c.req.json();
  
  // 获取所有投注
  const bets = await db.prepare(
    'SELECT * FROM bets WHERE period_id = ?'
  ).bind(periodId).all();
  
  let totalBets = 0;
  let totalPayout = 0;
  let winningBets = 0;
  
  bets.results.forEach(bet => {
    totalBets += bet.amount;
    const numbers = JSON.parse(bet.equivalent_numbers);
    
    // 检查是否中奖
    if (numbers.includes(result_number)) {
      totalPayout += bet.amount * 47; // 特码固定赔率47
      winningBets++;
    }
  });
  
  const profit = totalBets - totalPayout;
  
  // 更新期数状态
  await db.prepare(
    'UPDATE periods SET result_number = ?, status = ? WHERE id = ?'
  ).bind(result_number, 'completed', periodId).run();
  
  return c.json({
    success: true,
    result_number,
    total_bets: totalBets,
    total_payout: totalPayout,
    winning_bets: winningBets,
    profit: profit
  });
});

export default app;
