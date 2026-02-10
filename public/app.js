// ========== 号码映射数据定义 ==========
const numberData = {
  numbers: Array.from({ length: 49 }, (_, i) => i + 1),

  // 生肖
  zodiac: {
    '蛇': [1, 13, 25, 37, 49],
    '龙': [2, 14, 26, 38],
    '兔': [3, 15, 27, 39],
    '虎': [4, 16, 28, 40],
    '牛': [5, 17, 29, 41],
    '鼠': [6, 18, 30, 42],
    '猪': [7, 19, 31, 43],
    '狗': [8, 20, 32, 44],
    '鸡': [9, 21, 33, 45],
    '猴': [10, 22, 34, 46],
    '羊': [11, 23, 35, 47],
    '马': [12, 24, 36, 48]
  },

  // 野兽和家畜
  beast: {
    '野兽': [1, 2, 3, 4, 6, 10, 13, 14, 15, 16, 18, 22, 25, 26, 27, 28, 30, 34, 37, 38, 39, 40, 42, 46, 49],
    '家畜': [5, 7, 8, 9, 11, 12, 17, 19, 20, 21, 23, 24, 29, 31, 32, 33, 35, 36, 41, 43, 44, 45, 47, 48]
  },

  // 五行
  element: {
    '金': [3, 4, 11, 12, 25, 26, 33, 34, 41, 42],
    '木': [7, 8, 15, 16, 23, 24, 37, 38, 45, 46],
    '水': [13, 14, 21, 22, 29, 30, 43, 44],
    '火': [1, 2, 9, 10, 17, 18, 31, 32, 39, 40, 47, 48],
    '土': [5, 6, 19, 20, 27, 28, 35, 36, 49]
  },

  // 大小
  size: {
    '大': Array.from({ length: 25 }, (_, i) => i + 25), // 25-49
    '小': Array.from({ length: 24 }, (_, i) => i + 1)   // 1-24
  },

  // 尾大尾小
  tailSize: {
    '尾大': [5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29, 35, 36, 37, 38, 39, 45, 46, 47, 48, 49],
    '尾小': [1, 2, 3, 4, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 40, 41, 42, 43, 44]
  },

  // 单双
  parity: {
    '单': Array.from({ length: 25 }, (_, i) => i * 2 + 1).filter(n => n <= 49),
    '双': Array.from({ length: 24 }, (_, i) => (i + 1) * 2).filter(n => n <= 49)
  },

  // 波色
  wave: {
    '红': [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46],
    '蓝': [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48],
    '绿': [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]
  },

  // 头数
  head: {
    0: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    1: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    2: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    3: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    4: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
  },

  // 尾数
  tail: {
    0: [10, 20, 30, 40],
    1: [1, 11, 21, 31, 41],
    2: [2, 12, 22, 32, 42],
    3: [3, 13, 23, 33, 43],
    4: [4, 14, 24, 34, 44],
    5: [5, 15, 25, 35, 45],
    6: [6, 16, 26, 36, 46],
    7: [7, 17, 27, 37, 47],
    8: [8, 18, 28, 38, 48],
    9: [9, 19, 29, 39, 49]
  }
};

// ========== 筛选按钮映射（参考jisuanqi/script.js） ==========
const filterMap = {
  'red': numberData.wave['红'],
  'blue': numberData.wave['蓝'],
  'green': numberData.wave['绿'],
  'big': numberData.size['大'],
  'small': numberData.size['小'],
  'odd': numberData.parity['单'],
  'even': numberData.parity['双'],
  'wild': numberData.beast['野兽'],
  'domestic': numberData.beast['家畜'],
  'tailBig': numberData.tailSize['尾大'],
  'tailSmall': numberData.tailSize['尾小'],
  'head0': numberData.head[0],
  'head1': numberData.head[1],
  'head2': numberData.head[2],
  'head3': numberData.head[3],
  'head4': numberData.head[4],
  'tail0': numberData.tail[0],
  'tail1': numberData.tail[1],
  'tail2': numberData.tail[2],
  'tail3': numberData.tail[3],
  'tail4': numberData.tail[4],
  'tail5': numberData.tail[5],
  'tail6': numberData.tail[6],
  'tail7': numberData.tail[7],
  'tail8': numberData.tail[8],
  'tail9': numberData.tail[9],
  'gold': numberData.element['金'],
  'wood': numberData.element['木'],
  'water': numberData.element['水'],
  'fire': numberData.element['火'],
  'earth': numberData.element['土']
};

// 筛选按钮分类
const filterCategories = {
  'wave': ['red', 'blue', 'green'],
  'size': ['big', 'small'],
  'parity': ['odd', 'even'],
  'tailSize': ['tailBig', 'tailSmall'],
  'beast': ['wild', 'domestic'],
  'element': ['gold', 'wood', 'water', 'fire', 'earth'],
  'head': ['head0', 'head1', 'head2', 'head3', 'head4'],
  'tail': ['tail0', 'tail1', 'tail2', 'tail3', 'tail4', 'tail5', 'tail6', 'tail7', 'tail8', 'tail9'],
  'zodiac': ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
};

// ========== 工具函数 ==========

// 获取号码的波色
function getNumberWaveColor(number) {
  for (const [color, numbers] of Object.entries(numberData.wave)) {
    if (numbers.includes(number)) {
      return color === '红' ? 'red' : color === '蓝' ? 'blue' : 'green';
    }
  }
  return 'none';
}

// 获取号码的生肖
function getZodiacForNumber(number) {
  for (const [zodiac, numbers] of Object.entries(numberData.zodiac)) {
    if (numbers.includes(number)) return zodiac;
  }
  return '';
}

// 获取筛选按钮的分类
function getFilterCategory(filterKey) {
  for (const [category, filters] of Object.entries(filterCategories)) {
    if (filters.includes(filterKey)) return category;
  }
  return 'custom';
}

// 显示提示消息
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type} show`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => container.removeChild(toast), 2000);
}

// 关键字映射（用于解析输入）
const keywordMap = {
  '红': 'red', '红波': 'red',
  '蓝': 'blue', '蓝波': 'blue',
  '绿': 'green', '绿波': 'green',
  '大': 'big', '小': 'small',
  '单': 'odd', '双': 'even',
  '野': 'wild', '野兽': 'wild',
  '家': 'domestic', '家畜': 'domestic',
  '尾大': 'tailBig', '尾小': 'tailSmall',
  '金': 'gold', '木': 'wood', '水': 'water', '火': 'fire', '土': 'earth',
  '0头': 'head0', '1头': 'head1', '2头': 'head2', '3头': 'head3', '4头': 'head4',
  '0尾': 'tail0', '1尾': 'tail1', '2尾': 'tail2', '3尾': 'tail3', '4尾': 'tail4',
  '5尾': 'tail5', '6尾': 'tail6', '7尾': 'tail7', '8尾': 'tail8', '9尾': 'tail9',
  // 生肖关键字（直接映射到生肖名称，在 parseNumberInput 中处理）
  '鼠': '鼠', '牛': '牛', '虎': '虎', '兔': '兔', '龙': '龙', '蛇': '蛇',
  '马': '马', '羊': '羊', '猴': '猴', '鸡': '鸡', '狗': '狗', '猪': '猪'
};

// 选号器状态 - 支持分类管理
const pickerState = {
  selectedNumbers: new Set(),
  activeFilters: new Map(), // 分类 -> Set(筛选键)
  customNumbers: new Set()  // 手动输入的号码
};

// 根据号码和玩法类型计算分配金额
function calculateAllocatedAmount(number, betType, betValue, orderAmount) {
  // 特码直投：全额分配到指定号码
  if (betType === '特码直投') {
    return orderAmount;
  }

  // 大小
  if (betType === '大小') {
    const targetNumbers = betValue === '大' ? numberData.size['大'] : numberData.size['小'];
    if (targetNumbers.includes(number)) {
      return orderAmount / targetNumbers.length;
    }
    return 0;
  }

  // 单双
  if (betType === '单双') {
    const targetNumbers = betValue === '单' ? numberData.parity['单'] : numberData.parity['双'];
    if (targetNumbers.includes(number)) {
      return orderAmount / targetNumbers.length;
    }
    return 0;
  }

  // 尾大尾小
  if (betType === '尾大尾小') {
    const targetNumbers = betValue === '尾大' ? numberData.tailSize['尾大'] : numberData.tailSize['尾小'];
    if (targetNumbers.includes(number)) {
      return orderAmount / targetNumbers.length;
    }
    return 0;
  }

  // 生肖
  if (betType === '生肖' && numberData.zodiac[betValue]) {
    const targetNumbers = numberData.zodiac[betValue];
    if (targetNumbers.includes(number)) {
      return orderAmount / targetNumbers.length;
    }
    return 0;
  }

  // 波色
  if (betType === '波色' && numberData.wave[betValue]) {
    const targetNumbers = numberData.wave[betValue];
    if (targetNumbers.includes(number)) {
      return orderAmount / targetNumbers.length;
    }
    return 0;
  }

  // 野兽家畜
  if (betType === '野兽家畜' && numberData.beast[betValue]) {
    const targetNumbers = numberData.beast[betValue];
    if (targetNumbers.includes(number)) {
      return orderAmount / targetNumbers.length;
    }
    return 0;
  }

  // 五行
  if (betType === '五行' && numberData.element[betValue]) {
    const targetNumbers = numberData.element[betValue];
    if (targetNumbers.includes(number)) {
      return orderAmount / targetNumbers.length;
    }
    return 0;
  }

  return 0;
}



// 生成模拟数据
function generateMockData() {
  const data = [];
  const hotNumbers = [7, 18, 25, 33, 42];

  for (let i = 1; i <= 49; i++) {
    let amount = 0;
    let bets = 0;

    if (hotNumbers.includes(i)) {
      amount = Math.random() * 500 + 300;
      bets = Math.floor(Math.random() * 5) + 3;
    } else if (Math.random() > 0.4) {
      amount = Math.random() * 200 + 50;
      bets = Math.floor(Math.random() * 3) + 1;
    } else {
      amount = Math.random() * 50;
      bets = Math.random() > 0.5 ? 1 : 0;
    }

    const payout = amount * 47;
    const riskRatio = amount > 0 ? (payout / 15680 * 100).toFixed(1) : 0;

    let riskLevel = 'none';
    if (payout > 15000) riskLevel = 'high';
    else if (payout > 5000) riskLevel = 'medium';
    else if (payout > 0) riskLevel = 'low';

    data.push({
      number: i,
      amount: amount,
      bets: bets,
      payout: payout,
      riskRatio: riskRatio,
      riskLevel: riskLevel
    });
  }

  return data;
}

const mockData = generateMockData();

// 投注记录存储
let bettingRecords = [];

// 计算当年的第几天
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// 初始化当期期号：YYYY + DDD (当年的第几天，3位数)
const today = new Date();
const dayOfYear = String(getDayOfYear(today)).padStart(3, '0');
let currentPeriod = `${today.getFullYear()}${dayOfYear}`;

// 立即更新前端显示，防止HTML中硬编码的旧期号显示出来
setTimeout(() => {
  const periodEl = document.getElementById('sidebar-period');
  if (periodEl) periodEl.textContent = currentPeriod;
  updateSettleInfo();
}, 0);


// 排序状态（热力图和图表统一使用）
let globalSortBy = 'number'; // 'number' 或 'amount'

// 页面切换功能
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const page = e.currentTarget.dataset.page;

    // 更新导航和页面状态
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    e.currentTarget.classList.add('active');
    document.querySelectorAll('.page-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');

    // 页面特定初始化
    setTimeout(() => {
      if (page === 'betting' && typeof initNumberPickerGrid === 'function') {
        initNumberPickerGrid();
      } else if (page === 'settlement') {
        updateSettleInfo();
        renderDrawHistory();
      } else if (page === 'analysis') {
        updateAnalysisCharts();
        updateRiskAnalysis();
      }
    }, 50);
  });
});

// 验证投注内容
function validateBetValue(betType, betValue) {
  switch (betType) {
    case 'DIRECT':
      const num = parseInt(betValue);
      if (isNaN(num) || num < 1 || num > 49) {
        return { valid: false, message: '特码直投请输入1-49的号码' };
      }
      return { valid: true };

    case 'SIZE':
      if (!['大', '小'].includes(betValue)) {
        return { valid: false, message: '大小玩法请输入"大"或"小"' };
      }
      return { valid: true };

    case 'ODD_EVEN':
      if (!['单', '双'].includes(betValue)) {
        return { valid: false, message: '单双玩法请输入"单"或"双"' };
      }
      return { valid: true };

    case 'TAIL_SIZE':
      if (!['尾大', '尾小'].includes(betValue)) {
        return { valid: false, message: '尾大尾小请输入"尾大"或"尾小"' };
      }
      return { valid: true };

    case 'WAVE':
      if (!['红', '蓝', '绿'].includes(betValue)) {
        return { valid: false, message: '波色请输入"红"、"蓝"或"绿"' };
      }
      return { valid: true };

    case 'ZODIAC':
      const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
      if (!zodiacs.includes(betValue)) {
        return { valid: false, message: '生肖请输入正确的生肖名称' };
      }
      return { valid: true };

    case 'ELEMENT':
      if (!['金', '木', '水', '火', '土'].includes(betValue)) {
        return { valid: false, message: '五行请输入"金"、"木"、"水"、"火"或"土"' };
      }
      return { valid: true };

    default:
      return { valid: true };
  }
}

// 获取玩法名称
function getBetTypeName(betType) {
  const names = {
    'DIRECT': '特码直投',
    'SIZE': '大小',
    'ODD_EVEN': '单双',
    'TAIL_SIZE': '尾大尾小',
    'WAVE': '波色',
    'ZODIAC': '生肖',
    'ELEMENT': '五行'
  };
  return names[betType] || betType;
}

// 渲染投注记录（表格形式 - 按订单显示）
function renderBettingRecords() {
  const container = document.getElementById('records-list');
  const tableEl = document.getElementById('records-table');
  const emptyEl = document.getElementById('empty-records');

  if (bettingRecords.length === 0) {
    container.innerHTML = '';
    if (tableEl) tableEl.classList.add('hidden');
    if (emptyEl) emptyEl.classList.add('show');
    return;
  }

  if (tableEl) tableEl.classList.remove('hidden');
  if (emptyEl) emptyEl.classList.remove('show');

  // 按时间倒序显示
  const sortedRecords = [...bettingRecords].sort((a, b) => b.createTime - a.createTime);

  container.innerHTML = sortedRecords.map(record => {
    // 渲染所有号码球
    const numbersHtml = record.betNumbers.map(num => {
      const waveColor = getNumberWaveColor(num);
      return `<span class="number-badge ball-${waveColor}">${String(num).padStart(2, '0')}</span>`;
    }).join('');

    return `
      <tr>
        <td class="col-order-id">${record.orderId}</td>
        <td class="col-player">${record.playerName}</td>
        <td class="col-bet-type">${record.betType}</td>
        <td class="col-numbers">${numbersHtml}</td>
        <td class="col-amount">¥${record.betAmountPerNumber.toFixed(2)}</td>
        <td class="col-total">¥${record.totalAmount.toFixed(2)}</td>
        <td class="col-time">${record.timestamp}</td>
        <td>
          <button class="btn-delete-row" onclick="deleteBettingRecord('${record.orderId}')">删除</button>
        </td>
      </tr>
    `;
  }).join('');
}

// 更新记录统计
function updateRecordStats() {
  const totalCount = bettingRecords.length;
  const totalAmount = bettingRecords.reduce((sum, record) => sum + record.totalAmount, 0);

  document.getElementById('record-count').textContent = totalCount;
  document.getElementById('record-total').textContent = `¥${totalAmount.toFixed(2)}`;
}

// 删除投注记录
function deleteBettingRecord(orderId) {
  if (!confirm('确定要删除这条投注记录吗？')) {
    return;
  }

  bettingRecords = bettingRecords.filter(record => record.orderId !== orderId);

  renderBettingRecords();
  updateRecordStats();
  updateMockDataWithBets();
  refreshAllAnalysis();

  showToast('删除成功', 'success');
}

// ========== 数据更新和渲染 ==========

// 根据投注记录更新模拟数据
function updateMockDataWithBets() {
  mockData.forEach(item => {
    item.amount = 0;
    item.bets = 0;
  });

  bettingRecords.forEach(record => {
    record.betNumbers.forEach(num => {
      const item = mockData.find(d => d.number === num);
      if (item) {
        item.amount += record.betAmountPerNumber;
        item.bets += 1;
      }
    });
  });

  mockData.forEach(item => {
    item.payout = item.amount * 47;
    item.riskRatio = item.amount > 0 ? (item.payout / 15680 * 100).toFixed(1) : 0;
    item.riskLevel = item.payout > 15000 ? 'high' : item.payout > 5000 ? 'medium' : item.payout > 0 ? 'low' : 'none';
  });
}

// 刷新所有分析图表
function refreshAllAnalysis() {
  renderHeatmap();
  renderTable();
  renderAnalysisCards();
  renderWaveAnalysis();
  renderZodiacAnalysis();
  renderElementAnalysis();
  updateMetrics();
  renderHorizontalChart(document.querySelector('.toggle-btn-h.active')?.dataset.type || 'amount');
}

// 渲染分析卡片（大小、单双、尾数）
function renderAnalysisCards() {
  const analyses = [
    {
      id: 'size-analysis',
      items: [
        { label: '大 (25-49)', filter: n => n >= 25, color: '#ef4444' },
        { label: '小 (1-24)', filter: n => n < 25, color: '#3b82f6' }
      ]
    },
    {
      id: 'odd-even-analysis',
      items: [
        { label: '单', filter: n => n % 2 === 1, color: '#f59e0b' },
        { label: '双', filter: n => n % 2 === 0, color: '#10b981' }
      ]
    },
    {
      id: 'tail-analysis',
      items: [
        { label: '尾大 (5-9)', filter: n => n % 10 >= 5, color: '#ec4899' },
        { label: '尾小 (0-4)', filter: n => n % 10 < 5, color: '#8b5cf6' }
      ]
    }
  ];

  analyses.forEach(analysis => {
    const container = document.getElementById(analysis.id);
    if (!container) return;

    const total = mockData.reduce((sum, item) => sum + item.amount, 0);

    container.innerHTML = analysis.items.map(item => {
      const amount = mockData.filter(d => item.filter(d.number)).reduce((sum, d) => sum + d.amount, 0);
      const percentage = total > 0 ? (amount / total * 100).toFixed(1) : 0;

      return `
        <div class="analysis-bar-item">
          <div class="bar-label">
            <span>${item.label}</span>
            <span class="bar-value">¥${amount.toFixed(0)} (${percentage}%)</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${percentage}%; background: linear-gradient(90deg, ${item.color}, ${item.color}dd);"></div>
          </div>
        </div>
      `;
    }).join('');
  });
}

// 开新盘
document.getElementById('btn-new-period').addEventListener('click', () => {
  if (bettingRecords.length > 0) {
    if (!confirm('开新盘将清空当前所有投注记录，确定继续吗？')) {
      return;
    }
  }

  // 生成新盘期号
  // 在现有逻辑中，手动开新盘通常意味着开启下一期
  // 如果是按天计算期数（如每天一期），则可能是明天的期号，或者只是简单的数字递增
  // 这里根据用户需求 "2025263" 格式，假设手动开盘 意味着 "下一期"
  // 但通常这种格式是绑定日期的。如果一天多期，后缀可能需要扩展。
  // 鉴于用户只给出了 "2026035" 这种 年份+天数 的格式，我们假设每天一期。
  // 如果需要当天开新盘，可能意味着进入"下一天"或者逻辑需要调整。
  // 暂时实现为：当前期号 + 1
  const currentYear = parseInt(currentPeriod.substring(0, 4));
  const currentDay = parseInt(currentPeriod.substring(4));

  let nextYear = currentYear;
  let nextDay = currentDay + 1;

  // 简单处理跨年（不严谨，但符合基本逻辑）
  if (nextDay > 365) {
    nextYear++;
    nextDay = 1;
  }

  currentPeriod = `${nextYear}${String(nextDay).padStart(3, '0')}`;


  // 清空投注记录
  bettingRecords = [];

  // 更新显示
  document.getElementById('sidebar-period').textContent = currentPeriod;
  renderBettingRecords();
  updateRecordStats();
  updateMockDataWithBets();
  refreshAllAnalysis();

  showToast('新盘已开启', 'success');
});

// 渲染热力图 (10x5布局)
function renderHeatmap(sortBy = globalSortBy) {
  const grid = document.getElementById('heatmap-grid');
  grid.innerHTML = '';

  // 根据排序方式排列数据
  let sortedData;
  if (sortBy === 'amount') {
    // 按投注金额从大到小排序
    sortedData = [...mockData].sort((a, b) => b.amount - a.amount);
  } else {
    // 按号码顺序排列 1-49
    sortedData = [...mockData].sort((a, b) => a.number - b.number);
  }

  sortedData.forEach(item => {
    const cell = document.createElement('div');
    const waveColor = getNumberWaveColor(item.number);
    const zodiac = getZodiacForNumber(item.number);
    cell.className = `heatmap-cell risk-${item.riskLevel}`;
    cell.innerHTML = `
      <div class="cell-header">
        <div class="cell-number wave-${waveColor}">${item.number}</div>
        <div class="cell-zodiac">${zodiac}</div>
      </div>
      <div class="cell-amount">¥${item.amount.toFixed(0)}</div>
      <div class="cell-payout">赔${item.payout.toFixed(0)}</div>
    `;

    cell.addEventListener('click', () => {
      showNumberModal(item);
    });

    grid.appendChild(cell);
  });
}

// 渲染分类分析（波色、生肖、五行）
function renderCategoryAnalysis(containerId, dataKey, colorMap = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const totalAmount = mockData.reduce((sum, item) => sum + item.amount, 0);
  const categoryData = [];

  for (const [name, numbers] of Object.entries(numberData[dataKey])) {
    const amount = mockData.filter(item => numbers.includes(item.number)).reduce((sum, item) => sum + item.amount, 0);
    const payout = amount * 47;
    const percentage = totalAmount > 0 ? (amount / totalAmount * 100).toFixed(1) : 0;
    const sortedNumbers = mockData.filter(item => numbers.includes(item.number)).sort((a, b) => b.amount - a.amount).map(item => item.number);

    categoryData.push({ name, amount, payout, percentage, numbers: sortedNumbers, color: colorMap[name] || '#7c3aed' });
  }

  if (dataKey === 'zodiac') categoryData.sort((a, b) => b.amount - a.amount);

  const maxAmount = Math.max(...categoryData.map(d => d.amount), 1);

  container.innerHTML = categoryData.map(item => `
    <div class="analysis-item">
      <div class="analysis-item-header">
        <span class="analysis-item-name">${item.name}${dataKey === 'wave' ? '波' : ''}</span>
        <span class="analysis-item-amount">¥${item.amount.toFixed(0)}</span>
      </div>
      <div class="analysis-item-bar">
        <div class="analysis-item-fill" style="width: ${(item.amount / maxAmount * 100)}%; background: ${item.color};"></div>
      </div>
      <div class="analysis-item-stats">
        <span>占比: ${item.percentage}%</span>
        <span>赔付: ¥${item.payout.toFixed(0)}</span>
      </div>
      <div class="analysis-item-numbers">包含号码(按投注额): ${item.numbers.join(', ')}</div>
    </div>
  `).join('');
}

function renderWaveAnalysis() {
  renderCategoryAnalysis('wave-analysis', 'wave', { '红': '#ef4444', '蓝': '#3b82f6', '绿': '#10b981' });
}

function renderZodiacAnalysis() {
  renderCategoryAnalysis('zodiac-analysis', 'zodiac');
}

function renderElementAnalysis() {
  renderCategoryAnalysis('element-analysis', 'element', { '金': '#cbd5e1', '木': '#10b981', '水': '#3b82f6', '火': '#ef4444', '土': '#f59e0b' });
}

// 渲染数据表格
function renderTable(filter = 'all') {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';

  let filteredData = mockData.filter(item => item.amount > 0);

  if (filter === 'high') {
    filteredData = filteredData.filter(item => item.riskLevel === 'high');
  } else if (filter === 'medium') {
    filteredData = filteredData.filter(item => item.riskLevel === 'medium');
  } else if (filter === 'low') {
    filteredData = filteredData.filter(item => item.riskLevel === 'low');
  }

  filteredData.sort((a, b) => b.payout - a.payout);

  filteredData.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="risk-indicator ${item.riskLevel}"></span></td>
      <td><span class="number-badge">${item.number}</span></td>
      <td>¥${item.amount.toFixed(2)}</td>
      <td>${item.bets} 笔</td>
      <td style="color: #fca5a5; font-weight: 700;">¥${item.payout.toFixed(2)}</td>
      <td>${item.riskRatio}%</td>
      <td><button class="btn-detail" data-number="${item.number}">详情</button></td>
    `;

    // 添加详情按钮点击事件
    const detailBtn = tr.querySelector('.btn-detail');
    detailBtn.addEventListener('click', () => {
      showNumberModal(item);
    });

    tbody.appendChild(tr);
  });
}

// 显示号码详情弹窗
function showNumberModal(item) {
  const modal = document.getElementById('modal-overlay');
  modal.classList.add('active');

  document.getElementById('modal-number').textContent = item.number;
  document.getElementById('modal-amount').textContent = `¥${item.amount.toFixed(2)}`;
  document.getElementById('modal-bets').textContent = `${item.bets} 笔`;
  document.getElementById('modal-payout').textContent = `¥${item.payout.toFixed(2)}`;

  const riskText = item.riskLevel === 'high' ? '高风险' :
    item.riskLevel === 'medium' ? '中风险' :
      item.riskLevel === 'low' ? '低风险' : '无风险';
  document.getElementById('modal-risk').textContent = riskText;
  document.getElementById('modal-risk').className = `stat-value ${item.riskLevel === 'high' ? 'danger' : ''}`;

  // 生成模拟订单
  const ordersList = document.getElementById('orders-list');
  if (item.bets > 0) {
    const orders = [];

    // 定义可能的玩法和对应的投注值
    const betTypes = [
      { type: '特码直投', value: item.number.toString() },
      { type: '大小', value: item.number >= 25 ? '大' : '小' },
      { type: '单双', value: item.number % 2 === 1 ? '单' : '双' },
      { type: '尾大尾小', value: numberData.tailSize['尾大'].includes(item.number) ? '尾大' : '尾小' },
      { type: '波色', value: numberData.wave['红'].includes(item.number) ? '红' : numberData.wave['蓝'].includes(item.number) ? '蓝' : '绿' }
    ];

    // 添加生肖玩法
    for (const [zodiacName, numbers] of Object.entries(numberData.zodiac)) {
      if (numbers.includes(item.number)) {
        betTypes.push({ type: '生肖', value: zodiacName });
        break;
      }
    }

    for (let i = 0; i < item.bets; i++) {
      const selectedBet = betTypes[Math.floor(Math.random() * betTypes.length)];
      const orderAmount = Math.random() * 200 + 50;
      const allocatedAmount = calculateAllocatedAmount(item.number, selectedBet.type, selectedBet.value, orderAmount);

      const orderId = `${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

      orders.push({
        orderId: orderId,
        player: `玩家${Math.floor(Math.random() * 1000)}`,
        time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        type: selectedBet.type,
        value: selectedBet.value,
        amount: orderAmount,
        allocated: allocatedAmount
      });
    }

    ordersList.innerHTML = orders.map(order => `
      <div class="order-item">
        <div class="order-header">
          <span class="order-player">${order.player}</span>
          <span class="order-time">${order.time}</span>
        </div>
        <div class="order-id">订单号: ${order.orderId}</div>
        <div class="order-details">
          <div class="order-detail">
            <span class="detail-label">玩法</span>
            <span class="detail-value">${order.type}</span>
          </div>
          <div class="order-detail">
            <span class="detail-label">投注内容</span>
            <span class="detail-value">${order.value}</span>
          </div>
          <div class="order-detail">
            <span class="detail-label">投注额</span>
            <span class="detail-value">¥${order.amount.toFixed(2)}</span>
          </div>
          <div class="order-detail">
            <span class="detail-label">分配到此号</span>
            <span class="detail-value highlight">¥${order.allocated.toFixed(2)}</span>
          </div>
        </div>
      </div>
    `).join('');
  } else {
    ordersList.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">暂无投注订单</div></div>';
  }

  modal.classList.add('active');
}

// 关闭弹窗
document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-overlay').classList.remove('active');
});

document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'modal-overlay') {
    document.getElementById('modal-overlay').classList.remove('active');
  }
});

// 筛选功能
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    renderTable(e.target.dataset.filter);
  });
});

// 刷新按钮
const refreshBtn = document.getElementById('btn-refresh');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => location.reload());
}

// 渲染玩法分布
function renderDistribution() {
  const container = document.getElementById('distribution-grid');

  // 统计各玩法的实际投注数据
  const betTypeStats = {};
  const betTypeNames = {
    '特码直投': { color: '#7c3aed', odds: 47 },
    '大小': { color: '#3b82f6', odds: 1.88 },
    '单双': { color: '#10b981', odds: 1.88 },
    '尾大尾小': { color: '#f59e0b', odds: 1.88 },
    '波色': { color: '#ec4899', odds: 1.88 },
    '生肖': { color: '#8b5cf6', odds: 9.4 },
    '五行': { color: '#14b8a6', odds: 9.4 }
  };

  // 初始化统计
  Object.keys(betTypeNames).forEach(name => {
    betTypeStats[name] = { amount: 0, count: 0 };
  });

  // 统计投注记录
  bettingRecords.forEach(record => {
    if (betTypeStats[record.betType]) {
      betTypeStats[record.betType].amount += record.betAmount;
      betTypeStats[record.betType].count += 1;
    }
  });

  const totalAmount = Object.values(betTypeStats).reduce((sum, stat) => sum + stat.amount, 0);

  const distributions = Object.entries(betTypeNames).map(([name, config]) => {
    const stat = betTypeStats[name];
    const percentage = totalAmount > 0 ? (stat.amount / totalAmount * 100).toFixed(1) : 0;
    const payout = stat.amount * config.odds;

    return {
      name: name,
      amount: stat.amount,
      count: stat.count,
      percentage: percentage,
      payout: payout,
      color: config.color
    };
  }).filter(item => item.amount > 0); // 只显示有投注的玩法

  if (distributions.length === 0) {
    // 没有投注数据时显示所有玩法（金额为0）
    const allDistributions = Object.entries(betTypeNames).map(([name, config]) => ({
      name: name,
      amount: 0,
      count: 0,
      percentage: 0,
      payout: 0,
      color: config.color
    }));

    container.innerHTML = allDistributions.map(dist => `
      <div class="dist-card">
        <div class="dist-header">
          <span class="dist-name">${dist.name}</span>
          <span class="dist-percentage">0%</span>
        </div>
        <div class="dist-bar">
          <div class="dist-fill" style="width: 0%; background: ${dist.color};"></div>
        </div>
        <div class="dist-stats">
          <span>投注额: ¥${dist.amount.toFixed(0)}</span>
          <span>赔付: ¥${dist.payout.toFixed(0)}</span>
        </div>
      </div>
    `).join('');
    return;
  }

  container.innerHTML = distributions.map(dist => `
    <div class="dist-card">
      <div class="dist-header">
        <span class="dist-name">${dist.name}</span>
        <span class="dist-percentage">${dist.percentage}%</span>
      </div>
      <div class="dist-bar">
        <div class="dist-fill" style="width: ${dist.percentage}%; background: ${dist.color};"></div>
      </div>
      <div class="dist-stats">
        <span>投注额: ¥${dist.amount.toFixed(0)}</span>
        <span>赔付: ¥${dist.payout.toFixed(0)}</span>
      </div>
    </div>
  `).join('');
}



// 更新关键指标
function updateMetrics() {
  const totalBets = mockData.reduce((sum, item) => sum + item.amount, 0);
  const totalCount = mockData.reduce((sum, item) => sum + item.bets, 0);
  const maxPayoutItem = mockData.reduce((max, item) => item.payout > max.payout ? item : max, mockData[0]);

  document.getElementById('total-bets').textContent = `¥${totalBets.toFixed(0)}`;
  document.getElementById('total-change').textContent = `${totalCount} 笔`;
  document.getElementById('max-payout').textContent = `¥${maxPayoutItem.payout.toFixed(0)}`;
  document.getElementById('max-number').textContent = `号码 ${maxPayoutItem.number}`;
  document.getElementById('bet-count').textContent = totalCount;
  document.getElementById('avg-bet').textContent = `平均 ¥${(totalBets / totalCount).toFixed(0)}`;

  // 预期盈亏 (假设每个号码中奖概率相同)
  const expectedPayout = mockData.reduce((sum, item) => sum + item.payout, 0) / 49;
  const expectedProfit = totalBets - expectedPayout;
  document.getElementById('expected-profit').textContent = `¥${expectedProfit.toFixed(0)}`;
  document.getElementById('profit-status').textContent = expectedProfit > 0 ? '预期盈利' : '预期亏损';
  document.getElementById('profit-status').className = expectedProfit > 0 ? 'metric-change positive' : 'metric-change negative';
}

// 渲染横向柱状图
function renderHorizontalChart(type = 'amount', sortBy = globalSortBy) {
  const container = document.getElementById('horizontal-chart');

  // 根据排序方式排列数据
  let sortedData;
  if (sortBy === 'amount') {
    // 按投注金额从大到小排序
    sortedData = [...mockData].sort((a, b) => b.amount - a.amount);
  } else {
    // 按号码顺序排列 1-49
    sortedData = [...mockData].sort((a, b) => a.number - b.number);
  }

  const maxValue = type === 'bets'
    ? Math.max(...sortedData.map(d => d.bets))
    : Math.max(...sortedData.map(d => d.amount));

  const barsHtml = sortedData.map(item => {
    const value = type === 'bets' ? item.bets : item.amount;
    const heightPercentage = maxValue > 0 ? (value / maxValue * 100) : 0;
    const displayValue = type === 'bets' ? `${value}次` : `¥${value.toFixed(0)}`;
    const waveColor = getNumberWaveColor(item.number);
    const zodiac = getZodiacForNumber(item.number);

    return `
      <div class="h-bar-wrapper">
        <div class="h-bar risk-${item.riskLevel}" style="height: ${heightPercentage}%;" title="号码${item.number} (${zodiac}): ${displayValue}">
          ${value > 0 ? `<div class="h-bar-value">${displayValue}</div>` : ''}
        </div>
        <div class="h-bar-footer">
          <div class="h-bar-number wave-${waveColor}">${item.number}</div>
          <div class="h-bar-zodiac">${zodiac}</div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `<div class="horizontal-bars-container">${barsHtml}</div>`;
}

// 横向图表切换
document.addEventListener('DOMContentLoaded', () => {
  // 图表类型切换（投注笔数/投注金额）
  document.querySelectorAll('.toggle-btn-h').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.toggle-btn-h').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderHorizontalChart(e.target.dataset.type, globalSortBy);
    });
  });

  // 全局排序切换（统一控制热力图和图表）
  document.querySelectorAll('#global-sort-toggle .sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#global-sort-toggle .sort-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      globalSortBy = e.target.dataset.sort;
      // 同时更新热力图和图表
      renderHeatmap(globalSortBy);
      const currentType = document.querySelector('.toggle-btn-h.active')?.dataset.type || 'amount';
      renderHorizontalChart(currentType, globalSortBy);
    });
  });
});

// 初始化
renderHeatmap();
renderTable();
renderAnalysisCards();
renderWaveAnalysis();
renderZodiacAnalysis();
renderElementAnalysis();
updateMetrics();
renderHorizontalChart('amount');

// ========== 号码选择器功能 ==========

// 初始化号码选择网格
function initNumberPickerGrid() {
  const grid = document.getElementById('number-picker-grid');
  if (!grid) return;

  grid.innerHTML = '';

  for (let i = 1; i <= 49; i++) {
    const waveColor = getNumberWaveColor(i);
    const zodiac = getZodiacForNumber(i);

    const ball = document.createElement('div');
    ball.className = `picker-ball ball-${waveColor}`;
    ball.dataset.number = i;
    ball.innerHTML = `
      <span class="picker-ball-number">${String(i).padStart(2, '0')}</span>
      <span class="picker-ball-zodiac">${zodiac}</span>
    `;

    ball.addEventListener('click', () => togglePickerNumber(i));
    grid.appendChild(ball);
  }

  // 初始化输入框事件
  initNumberInputEvents();
}

// 切换号码选择
function togglePickerNumber(num) {
  if (pickerState.selectedNumbers.has(num)) {
    pickerState.selectedNumbers.delete(num);
  } else {
    pickerState.selectedNumbers.add(num);
  }
  updatePickerUI();
}

// 添加号码到选择集
function addPickerNumbers(numbers) {
  numbers.forEach(num => pickerState.selectedNumbers.add(num));
  updatePickerUI();
}

// 移除号码
function removePickerNumbers(numbers) {
  numbers.forEach(num => pickerState.selectedNumbers.delete(num));
  updatePickerUI();
}

// 设置选择的号码
function setPickerNumbers(numbers) {
  pickerState.selectedNumbers.clear();
  numbers.forEach(num => pickerState.selectedNumbers.add(num));
  updatePickerUI();
}

// 清空选择
function clearPickerSelection() {
  pickerState.selectedNumbers.clear();
  pickerState.activeFilters.clear();
  pickerState.customNumbers.clear();
  // 清除筛选按钮状态
  document.querySelectorAll('.filter-btn-bet.active').forEach(btn => {
    btn.classList.remove('active');
  });
  // 清空输入框
  const inputEl = document.getElementById('number-input');
  if (inputEl) inputEl.value = '';
  updatePickerUI();
}

// 全选
function selectAllNumbers() {
  pickerState.activeFilters.clear();
  pickerState.customNumbers.clear();
  for (let i = 1; i <= 49; i++) {
    pickerState.customNumbers.add(i);
  }
  recalculateSelectedNumbers();
  updatePickerUI();
}

// 反选
function invertSelection() {
  const current = new Set(pickerState.selectedNumbers);
  pickerState.activeFilters.clear();
  pickerState.customNumbers.clear();
  for (let i = 1; i <= 49; i++) {
    if (!current.has(i)) {
      pickerState.customNumbers.add(i);
    }
  }
  // 清除筛选按钮状态
  document.querySelectorAll('.filter-btn-bet.active').forEach(btn => {
    btn.classList.remove('active');
  });
  recalculateSelectedNumbers();
  updatePickerUI();
}

// 核心逻辑：根据activeFilters计算最终选中的号码
// 规则：同类并集，不同类交集
function recalculateSelectedNumbers() {
  if (pickerState.activeFilters.size === 0 && pickerState.customNumbers.size === 0) {
    pickerState.selectedNumbers.clear();
    return;
  }

  // 收集每个分类的号码集合
  const categoryResults = [];

  // 处理筛选按钮
  for (const [category, filterKeys] of pickerState.activeFilters.entries()) {
    if (filterKeys.size === 0) continue;

    // 同类内部取并集
    const categoryNumbers = new Set();
    for (const filterKey of filterKeys) {
      let numbers = [];
      if (category === 'zodiac') {
        numbers = numberData.zodiac[filterKey] || [];
      } else if (filterMap[filterKey]) {
        numbers = filterMap[filterKey];
      }
      numbers.forEach(n => categoryNumbers.add(n));
    }

    if (categoryNumbers.size > 0) {
      categoryResults.push(categoryNumbers);
    }
  }

  // 处理手动输入的号码作为一个独立分类
  if (pickerState.customNumbers.size > 0) {
    categoryResults.push(new Set(pickerState.customNumbers));
  }

  // 不同分类间取交集
  if (categoryResults.length === 0) {
    pickerState.selectedNumbers.clear();
  } else if (categoryResults.length === 1) {
    pickerState.selectedNumbers = new Set(categoryResults[0]);
  } else {
    // 交集计算
    let result = new Set(categoryResults[0]);
    for (let i = 1; i < categoryResults.length; i++) {
      result = new Set([...result].filter(n => categoryResults[i].has(n)));
    }
    pickerState.selectedNumbers = result;
  }
}

// 更新选择器UI
function updatePickerUI() {
  // 更新号码球选中状态
  document.querySelectorAll('.picker-ball').forEach(ball => {
    const num = parseInt(ball.dataset.number);
    if (pickerState.selectedNumbers.has(num)) {
      ball.classList.add('selected');
    } else {
      ball.classList.remove('selected');
    }
  });

  // 更新选中数量
  const countEl = document.getElementById('selected-count');
  if (countEl) {
    countEl.textContent = pickerState.selectedNumbers.size;
  }

  // 更新预览区
  updateSelectedNumbersPreview();

  // 更新总金额
  updateTotalBetAmount();
}

// 处理号码输入添加
function handleNumberInputAdd() {
  const inputEl = document.getElementById('number-input');
  if (!inputEl) return;

  const input = inputEl.value.trim();
  if (!input) {
    showToast('请输入号码或筛选条件', 'warning');
    return;
  }

  const numbers = parseNumberInput(input);

  if (numbers.length === 0) {
    showToast('未能识别有效号码', 'error');
    return;
  }

  // 添加到自定义号码集合
  numbers.forEach(n => pickerState.customNumbers.add(n));

  // 更新状态
  recalculateSelectedNumbers();
  updatePickerUI();

  // 清空输入框
  inputEl.value = '';
  // 显示反馈
  showToast(`已添加 ${numbers.length} 个号码`, 'success');
}

// 初始化输入事件
function initNumberInputEvents() {
  const btnAdd = document.getElementById('btn-add-input');
  const inputEl = document.getElementById('number-input');

  if (!btnAdd || !inputEl) return;

  btnAdd.onclick = () => handleNumberInputAdd();
  inputEl.onkeypress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNumberInputAdd();
    }
  };
  inputEl.onfocus = function () { this.select(); };
}

// 更新选中号码预览
function updateSelectedNumbersPreview() {
  const container = document.getElementById('selected-numbers-preview');
  if (!container) return;

  if (pickerState.selectedNumbers.size === 0) {
    container.innerHTML = '<span class="preview-placeholder">点击号码或使用筛选按钮选择投注号码...</span>';
    return;
  }

  const sortedNumbers = Array.from(pickerState.selectedNumbers).sort((a, b) => a - b);

  container.innerHTML = sortedNumbers.map(num => {
    const waveColor = getNumberWaveColor(num);
    return `<span class="preview-number ball-${waveColor}">${String(num).padStart(2, '0')}</span>`;
  }).join('');
}

// 更新投注总额和注数
function updateTotalBetAmount() {
  const amountInput = document.getElementById('quick-bet-amount');
  const totalEl = document.getElementById('total-bet-amount');
  const countEl = document.getElementById('bet-count-display');

  const count = pickerState.selectedNumbers.size;

  if (countEl) {
    countEl.textContent = count;
  }

  if (!amountInput || !totalEl) return;

  const perAmount = parseFloat(amountInput.value) || 0;
  const total = perAmount * count;

  totalEl.textContent = `¥${total.toFixed(2)}`;
}

// 处理筛选按钮点击 - 同类并集，不同类交集
function handleBetFilterClick(btn) {
  const filter = btn.dataset.filter;
  const zodiac = btn.dataset.zodiac;
  const isActive = btn.classList.contains('active');

  let filterKey, category;

  if (zodiac) {
    filterKey = zodiac;
    category = 'zodiac';
  } else if (filter) {
    filterKey = filter;
    category = getFilterCategory(filter);
  } else {
    return;
  }

  if (isActive) {
    // 取消选中
    btn.classList.remove('active');
    if (pickerState.activeFilters.has(category)) {
      pickerState.activeFilters.get(category).delete(filterKey);
      if (pickerState.activeFilters.get(category).size === 0) {
        pickerState.activeFilters.delete(category);
      }
    }
  } else {
    // 选中
    btn.classList.add('active');
    if (!pickerState.activeFilters.has(category)) {
      pickerState.activeFilters.set(category, new Set());
    }
    pickerState.activeFilters.get(category).add(filterKey);
  }

  recalculateSelectedNumbers();
  updatePickerUI();
}

// 解析输入字符串为号码数组
function parseNumberInput(input) {
  const numbers = new Set();
  if (!input || !input.trim()) return [];

  // 先尝试智能分词（识别连续的关键字，如"红蓝"、"龙虎蛇"）
  const keywords = [];
  let remaining = input.trim();

  // 按长度从长到短匹配关键字（优先匹配"红波"而不是"红"）
  const allKeywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);

  while (remaining.length > 0) {
    let matched = false;

    // 尝试匹配关键字
    for (const keyword of allKeywords) {
      if (remaining.startsWith(keyword)) {
        keywords.push(keyword);
        remaining = remaining.slice(keyword.length);
        matched = true;
        break;
      }
    }

    // 如果没有匹配到关键字，尝试匹配数字或分隔符
    if (!matched) {
      // 匹配数字（包括范围如 1-10）
      const numMatch = remaining.match(/^(\d+[-~]?\d*)/);
      if (numMatch) {
        keywords.push(numMatch[1]);
        remaining = remaining.slice(numMatch[1].length);
      } else {
        // 跳过分隔符或无法识别的字符
        remaining = remaining.slice(1);
      }
    }
  }

  // 处理识别出的关键字和数字
  for (const part of keywords) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // 1. 处理范围表达式 如 4-8, 2~34
    const rangeMatch = trimmed.match(/^(\d+)[-~](\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1]);
      const end = parseInt(rangeMatch[2]);
      for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
        if (i >= 1 && i <= 49) numbers.add(i);
      }
      continue;
    }

    // 2. 处理纯数字
    const num = parseInt(trimmed);
    if (!isNaN(num) && num >= 1 && num <= 49) {
      numbers.add(num);
      continue;
    }

    // 3. 处理生肖（优先检查，因为生肖是中文单字）
    if (numberData.zodiac[trimmed]) {
      numberData.zodiac[trimmed].forEach(n => numbers.add(n));
      continue;
    }

    // 4. 处理关键字（波色、大小、单双等）
    if (keywordMap[trimmed]) {
      const filterKey = keywordMap[trimmed];
      if (filterMap[filterKey]) {
        filterMap[filterKey].forEach(n => numbers.add(n));
      } else if (numberData.zodiac[filterKey]) {
        // 如果是生肖关键字，直接从 numberData.zodiac 获取
        numberData.zodiac[filterKey].forEach(n => numbers.add(n));
      }
      continue;
    }
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

// 快速录入投注 - 以订单为单位
function handleQuickBetSubmit() {
  const playerName = document.getElementById('quick-player-name')?.value ||
    `玩家${Math.floor(Math.random() * 1000)}`;
  const betAmount = parseFloat(document.getElementById('quick-bet-amount')?.value);
  const betType = document.getElementById('quick-bet-type')?.value || '特码直投';

  if (pickerState.selectedNumbers.size === 0) {
    showToast('请先选择号码', 'error');
    return;
  }

  if (!betAmount || betAmount <= 0) {
    showToast('请输入有效的投注金额', 'error');
    return;
  }

  const now = new Date();
  const dateStr = now.getFullYear().toString() + (now.getMonth() + 1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0');
  const timeStr = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
  // 订单号格式: YYYYMMDD-HHMM-序号
  const orderId = `${dateStr}-${timeStr}-${String(bettingRecords.length + 1).padStart(3, '0')}`;

  const sortedNumbers = Array.from(pickerState.selectedNumbers).sort((a, b) => a - b);

  const order = {
    orderId: orderId,
    period: currentPeriod,
    playerName: playerName,
    betType: betType, // 确保这个字段被保存
    betNumbers: sortedNumbers,
    betAmountPerNumber: betAmount,
    totalAmount: betAmount * sortedNumbers.length,
    timestamp: now.toLocaleString('zh-CN'),
    createTime: Date.now()
  };

  bettingRecords.push(order);

  // 更新显示
  renderBettingRecords();
  updateRecordStats();
  updateMockDataWithBets();
  refreshAllAnalysis();

  // 显示成功提示
  showToast(`成功录入 ${sortedNumbers.length} 注投注，共 ¥${order.totalAmount.toFixed(2)}`, 'success');

  // 清空选择和输入
  clearPickerSelection();
  const amountInput = document.getElementById('quick-bet-amount');
  if (amountInput) amountInput.value = '';
}

// 清空所有投注记录
function clearAllBettingRecords() {
  if (bettingRecords.length === 0) {
    showToast('没有可清空的记录', 'error');
    return;
  }

  if (!confirm('确定要清空所有投注记录吗？此操作不可恢复！')) {
    return;
  }

  bettingRecords = [];

  renderBettingRecords();
  updateRecordStats();
  updateMockDataWithBets();
  refreshAllAnalysis();

  showToast('已清空所有投注记录', 'success');
}

// 初始化投注管理页面
function initBettingPage() {
  // 初始化号码选择网格
  initNumberPickerGrid();

  // 绑定筛选按钮事件
  document.querySelectorAll('.filter-btn-bet').forEach(btn => {
    btn.addEventListener('click', () => handleBetFilterClick(btn));
  });

  // 绑定全选按钮
  const selectAllBtn = document.getElementById('btn-select-all');
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', selectAllNumbers);
  }

  // 绑定反选按钮
  const invertBtn = document.getElementById('btn-invert');
  if (invertBtn) {
    invertBtn.addEventListener('click', invertSelection);
  }

  // 绑定清空选择按钮
  const clearSelectionBtn = document.getElementById('btn-clear-selection');
  if (clearSelectionBtn) {
    clearSelectionBtn.addEventListener('click', clearPickerSelection);
  }

  // 绑定金额输入框 - 实时更新总额
  const amountInput = document.getElementById('quick-bet-amount');
  if (amountInput) {
    amountInput.addEventListener('input', updateTotalBetAmount);
  }

  // 绑定录入按钮
  const submitBtn = document.getElementById('btn-quick-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', handleQuickBetSubmit);
  }



  // 金额输入框回车提交
  if (amountInput) {
    amountInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleQuickBetSubmit();
      }
    });
  }
}

// 页面加载完成后初始化投注管理
document.addEventListener('DOMContentLoaded', initBettingPage);

// ========== 开奖结算系统 ==========

// 历史开奖记录
let drawHistory = [];

// 尝试从localStorage加载历史记录
try {
  const saved = localStorage.getItem('drawHistory');
  if (saved) drawHistory = JSON.parse(saved);
} catch (e) { /* ignore */ }

// 获取号码所有属性标签
function getNumberAttributes(num) {
  const attrs = [];

  // 波色
  const waveColor = getNumberWaveColor(num);
  const waveNames = { red: '红波', blue: '蓝波', green: '绿波' };
  attrs.push({ text: waveNames[waveColor], class: `tag-${waveColor}` });

  // 大小
  attrs.push({ text: num >= 25 ? '大' : '小', class: '' });

  // 单双
  attrs.push({ text: num % 2 === 1 ? '单' : '双', class: '' });

  // 尾大尾小
  attrs.push({ text: num % 10 >= 5 ? '尾大' : '尾小', class: '' });

  // 生肖
  const zodiac = getZodiacForNumber(num);
  if (zodiac) attrs.push({ text: zodiac, class: '' });

  // 五行
  for (const [name, numbers] of Object.entries(numberData.element)) {
    if (numbers.includes(num)) {
      attrs.push({ text: `五行·${name}`, class: '' });
      break;
    }
  }

  // 野兽/家畜
  attrs.push({ text: numberData.beast['野兽'].includes(num) ? '野兽' : '家畜', class: '' });

  return attrs;
}

// 初始化结算页面的号码快选网格
// 获取最新开奖数据
// 获取最新开奖数据
async function fetchLatestResult() {
  const btn = document.getElementById('btn-fetch-draw');
  const originalText = btn.innerHTML;

  try {
    btn.innerHTML = '<span>获取中...</span>';
    btn.disabled = true;

    // 使用 fetch 获取数据
    const response = await fetch('https://macaumarksix.com/api/macaujc2.com');
    if (!response.ok) throw new Error('网络请求失败');

    const data = await response.json();

    // API返回的是数组，取第一项
    if (data && data.length > 0) {
      const item = data[0];

      if (item.openCode) {
        // 如果当前期号与API期号不一致，且当前期号大于API期号，说明API数据滞后，不应填充
        // 这里需要处理期号格式差异，API是 "2025042"，本地是 "2026042"
        // 假设API期号格式也是 YYYYDDD

        // 简单比较：如果API期号 == 当前期号，或者我们只想看最新数据
        // 用户需求：如果当前期数还没开奖，不要将旧期数来充当

        // 转换API期号格式（如果需要）
        // 假设 API 返回的 expect 格式为 "2025042"
        const apiPeriod = String(item.expect);

        if (apiPeriod !== currentPeriod) {
          showToast(`获取到的数据是第 ${apiPeriod} 期，与当前期号 ${currentPeriod} 不符，可能是旧数据`, 'warning');
          // 根据需求，不填充旧数据
          return;
        }

        // 解析号码字符串 "37,30,49,16,09,12,45"
        const numbers = item.openCode.split(',').map(n => parseInt(n));

        if (numbers.length === 7) {
          fillDrawInputs(numbers);
          showToast(`获取成功: 第${item.expect}期`, 'success');
        } else {
          showToast('获取的数据格式不正确', 'error');
        }
      }
    } else {
      showToast('未获取到开奖数据', 'warning');
    }
  } catch (e) {
    console.error(e);
    showToast('获取开奖数据失败: ' + e.message, 'error');
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}


// 填充开奖输入框
function fillDrawInputs(numbers) {
  const inputs = document.querySelectorAll('.settle-draw-input');
  inputs.forEach((input, index) => {
    if (numbers[index]) {
      input.value = numbers[index];
    }
  });
}


// 更新结算页面的投注信息概览
function updateSettleInfo() {
  const periodEl = document.getElementById('settle-period-display');
  // 移除旧的 countEl 和 totalEl 逻辑，使用新的 summary 信息替换
  const summaryContainer = document.getElementById('settle-summary-header');

  if (periodEl) periodEl.textContent = currentPeriod;

  if (summaryContainer) {
    const totalBets = bettingRecords.length;
    const totalAmount = bettingRecords.reduce((sum, r) => sum + r.totalAmount, 0);

    // 解析期号 YYYYDDD
    const year = currentPeriod.substring(0, 4);
    const day = currentPeriod.substring(4);

    summaryContainer.innerHTML = `
      <div style="font-size: 24px; font-weight: 800; color: #f1f5f9; margin-bottom: 12px;">
        当前期号 <span style="color: #7c3aed; font-size: 28px;">${year}年${day}号</span>
      </div>
      <div style="font-size: 16px; color: #94a3b8;">
        共 <strong style="color: #f1f5f9;">${totalBets}</strong> 笔订单，总金额 <strong style="color: #10b981;">¥${totalAmount.toFixed(2)}</strong>
      </div>
    `;
  }
}

// 执行开奖结算
// 执行开奖结算
function performSettlement() {
  if (bettingRecords.length === 0) {
    showToast('当前没有投注记录，无法开奖', 'error');
    return;
  }

  const inputs = document.querySelectorAll('.settle-draw-input');
  const drawNumbers = [];
  let isValid = true;

  inputs.forEach(input => {
    const val = parseInt(input.value);
    if (isNaN(val) || val < 1 || val > 49) {
      isValid = false;
    }
    drawNumbers.push(val);
  });

  if (!isValid || drawNumbers.length !== 7) {
    showToast('请输入完整的7个有效开奖号码(1-49)', 'error');
    return;
  }

  // 最后一个号码为特码，用于计算现有玩法的结算
  const specialNumber = drawNumbers[6];

  // 显示开奖动画
  showDrawAnimation(specialNumber, () => {
    // 计算结算结果 (使用特码)
    const results = calculateSettlement(specialNumber);

    // 保存到历史 (保存所有号码)
    saveToHistory(drawNumbers, results);

    // 渲染结算结果 (传入所有号码)
    renderSettlementResult(drawNumbers, results);

    // 更新历史记录展示
    renderDrawHistory();

    // 清空当前投注记录，准备下一期（用户需求：结算后通常需要手动清空或者自动进入下期）
    // 这里保持当前状态，但应该有一个视觉反馈
    showToast(`开奖结算完成！特码：${specialNumber}`, 'success');
  });
}

// 辅助函数：正确计算订单数 (目前 results.totalBets 计算的是投注号码总数，需要改为订单数)
function calculateSettlement(specialNumber) {
  const results = {
    totalBets: 0, // 这里的含义修改为“订单数”
    totalBetAmount: 0,
    winCount: 0,
    loseCount: 0,
    totalPayout: 0,
    profit: 0,
    bets: []
  };

  bettingRecords.forEach(record => {
    // 计算单个订单的结果
    let winNumbers = [];
    let loseNumbers = [];

    // 根据注单类型判断中奖
    // ... (现有逻辑不变)

    // 这里需要注意：如果是多号码投注，通常只要有一个号码中了就算该订单包含中奖
    // 或者按“注”来算？
    // 之前的逻辑是拆分到号码。
    // 现在我们需要按“订单”维度来统计 totalBets

    // 重新审视之前的 calculateSettlement 逻辑，它似乎直接用了 results.totalBets += record.betNumbers.length
    // 这会导致“笔数”变成“注数”。用户要求“不要将投注数作为显示笔数，必须以订单为笔数显示”

    // 因此，我们只需在循环外统计订单数，或者在循环内 +1 而不是 +betNumbers.length
  });

  // 必须重新实现 calculateSettlement 以确保逻辑正确
  // 为了不破坏原有逻辑结构，我将使用下方的完整替换
  return calculateSettlementFixed(specialNumber);
}

function calculateSettlementFixed(specialNumber) {
  const results = {
    totalBets: 0, // 订单数
    totalBetAmount: 0,
    winCount: 0, // 中奖订单数
    loseCount: 0, // 未中奖订单数
    totalPayout: 0,
    profit: 0,
    bets: []
  };

  // 1. 设置订单数
  results.totalBets = bettingRecords.length;

  bettingRecords.forEach(record => {
    let winNumbers = [];
    let orderPayout = 0;

    // 遍历该订单下的所有投注号码/选项
    record.betNumbers.forEach(betVal => {
      let isWin = false;
      const betType = record.betType;

      if (betType === '特码直投') {
        if (betVal === specialNumber) isWin = true;
      } else if (betType === '大小') {
        const target = record.betValue === '大' ? numberData.size['大'] : numberData.size['小'];
        if (target && target.includes(specialNumber)) isWin = true;
      } else if (betType === '单双') {
        const target = record.betValue === '单' ? numberData.parity['单'] : numberData.parity['双'];
        if (target && target.includes(specialNumber)) isWin = true;
      } else if (betType === '波色') {
        const target = numberData.wave[record.betValue];
        if (target && target.includes(specialNumber)) isWin = true;
      } else if (betType === '生肖') {
        const target = numberData.zodiac[record.betValue];
        if (target && target.includes(specialNumber)) isWin = true;
      } else if (betType === '五行') {
        const target = numberData.element[record.betValue];
        if (target && target.includes(specialNumber)) isWin = true;
      } else if (betType === '尾大尾小') {
        const target = record.betValue === '尾大' ? numberData.tailSize['尾大'] : numberData.tailSize['尾小'];
        if (target && target.includes(specialNumber)) isWin = true;
      } else if (betType === '野兽家畜') {
        const target = numberData.beast[record.betValue] || numberData.beast[record.betValue === '野' ? '野兽' : '家畜']; // 兼容
        if (target && target.includes(specialNumber)) isWin = true;
      }

      if (isWin) {
        winNumbers.push(betVal);
        // 只有命中的那一注有赔付
        orderPayout += record.betAmountPerNumber * 47; // 简单假设所有赔率 47, 实际上像大小单双赔率不同 (通常接近 2.0)

        // 修正：特码直投赔率 47，两面盘（大小单双等）通常是 1.96-1.98
        // 这里为了简化，保留原逻辑 (之前全部转换为特码号码来算赔率?)
        // 之前的 calculateSettlement 并没有区分赔率，统一用了 * 47
        // *这在两面玩法上是不对的* (大小中了不可能是47倍)
        // 但鉴于之前的代码也可能简化了，或者用户是按照“特码”模式来玩
        // 观察之前的 updateMockDataWithBets: item.payout = item.amount * 47;
        // 看来系统目前暂时统一用 47 (或者仅仅是直投系统)
        // 既然是"庄家系统"，对于两面盘，如果按 47 倍赔付庄家会亏死。
        // 假设：非直投玩法的注单，我们在转换时已经把 betNumbers 变成了具体的号码?
        // 如果是这样，那 length * perNumber * odds 就会非常巨大。
        // 比如下注 '大' 100元，如果系统拆成了 25个号码每号4元，那没问题。
        // 如果是下注 '大' 100元，系统存了 25 个号码，每号 100元？那就有问题。
        // 回看 handleBetSubmit: ... bets.push(...numbers); ... const amountPerNumber = totalAmount / bets.length;
        // 它是把总额平分到了每个号码上。所以 amountPerNumber 是正确的“单注金额”。
        // 那么，如果买 '大' (25个号)，中了特码 (比如 30)，则只有一个号命中。
        // 中奖金额 = amountPerNumber * 47。
        // 举例：买100元大，即25个号，每号4元。特码开30。只有30号命中。
        // 赔付 = 4 * 47 = 188元。 100本金 -> 188。 赔率接近 1.88。 合理。
        // 所以，**以前的逻辑（* 47）是通用的**，因为它基于“平分到特码”的逻辑。
        // 所以这里我不需要改赔率，继续用 47 即可。
      }
    });

    // 重新计算该订单的总赔付 (如果两面盘，需要正确赔率)
    // 临时修正赔率逻辑：
    // 直投: 48 (通常 1:48 左右)
    // 两面: 1.98
    // 生肖: 12
    // 波色: 3
    let odds = 47.0;
    if (['大小', '单双', '尾大尾小', '野兽家畜'].includes(record.betType)) odds = 1.96;
    if (['生肖'].includes(record.betType)) odds = 11.5;
    if (['波色'].includes(record.betType)) odds = 2.8;

    // 注意：上面的 winNumbers.push(betVal) 对于非直投可能不适用，因为 betVal 可能是 '大' 或 具体号码
    // 之前的系统似乎在下注时就把 '大' 转换成了 25,26...49 这些号码？
    // 如果是这样，那 length * perNumber * odds 就会非常巨大。
    // 比如下注 '大' 100元，如果系统拆成了 25个号码每号4元，那没问题。
    // 如果是下注 '大' 100元，系统存了 25 个号码，每号 100元？那就有问题。
    // 回看 handleBetSubmit: ... bets.push(...numbers); ... const amountPerNumber = totalAmount / bets.length;
    // 它是把总额平分到了每个号码上。所以 amountPerNumber 是正确的“单注金额”。
    // 那么，如果买 '大' (25个号)，中了特码 (比如 30)，则只有一个号命中。
    // 中奖金额 = amountPerNumber * 47。
    // 举例：买100元大，即25个号，每号4元。特码开30。只有30号命中。
    // 赔付 = 4 * 47 = 188元。 100本金 -> 188。 赔率接近 1.88。 合理。
    // 所以，**以前的逻辑（* 47）是通用的**，因为它基于“平分到特码”的逻辑。
    // 所以这里我不需要改赔率，继续用 47 即可。

    const payout = winNumbers.length * record.betAmountPerNumber * 47;

    results.totalBetAmount += record.totalAmount;
    results.totalPayout += payout;

    if (payout > 0) {
      results.winCount++;
    } else {
      results.loseCount++;
    }

    results.bets.push({
      ...record,
      winNumbers: winNumbers,
      hasWin: payout > 0,
      payout: payout,
      odds: 47.0, // 目前统一逻辑为47
      profit: record.totalAmount - payout // 订单层面的庄家盈亏 (投入 - 赔付)
    });
  });

  results.profit = results.totalBetAmount - results.totalPayout;
  return results;
}


// 开奖动画（简化版）
function showDrawAnimation(finalNumber, callback) {
  const overlay = document.getElementById('draw-animation-overlay');
  const ball = document.getElementById('draw-spinning-ball');
  const animText = overlay.querySelector('.draw-animation-text');

  overlay.classList.add('active');
  ball.textContent = '?';
  animText.textContent = '开奖中...';

  // 简单延迟后直接显示结果
  setTimeout(() => {
    const waveColor = getNumberWaveColor(finalNumber);
    const zodiac = getZodiacForNumber(finalNumber);

    ball.textContent = String(finalNumber).padStart(2, '0');
    ball.className = `draw-spinning-ball ball-${waveColor}`;
    animText.textContent = `开奖号码: ${finalNumber} · ${zodiac}`;

    setTimeout(() => {
      overlay.classList.remove('active');
      ball.className = 'draw-spinning-ball';
      callback();
    }, 800);
  }, 500);
}

// 渲染结算结果
// 渲染结算结果
function renderSettlementResult(drawNumbers, results) {
  const container = document.getElementById('settlement-result');

  // 兼容旧的单一号码调用 (如果是数字)
  if (typeof drawNumbers === 'number') {
    // 构造一个假数组, 只有特码
    drawNumbers = [0, 0, 0, 0, 0, 0, drawNumbers];
  }

  const specialNumber = drawNumbers[6]; // 第7个是特码
  const waveColor = getNumberWaveColor(specialNumber);
  const zodiac = getZodiacForNumber(specialNumber);
  const attrs = getNumberAttributes(specialNumber);

  const profitClass = results.profit > 0 ? 'profit' : results.profit < 0 ? 'loss' : 'neutral';
  const bannerClass = results.profit > 0 ? 'banner-profit' : results.profit < 0 ? 'banner-loss' : 'banner-neutral';
  const profitSign = results.profit >= 0 ? '+' : '';

  // 分离中奖和未中奖的订单
  const winBets = results.bets.filter(b => b.hasWin);
  const loseBets = results.bets.filter(b => !b.hasWin);

  // 生成开奖号码球HTML
  const drawBallsHtml = drawNumbers.map((num, idx) => {
    if (!num) return ''; // 兼容旧数据
    const wColor = getNumberWaveColor(num);
    const z = getZodiacForNumber(num);
    const isSpecial = idx === 6;

    return `
      <div class="settle-draw-ball ball-${wColor}" style="${isSpecial ? 'transform: scale(1.1); box-shadow: 0 0 10px rgba(0,0,0,0.3);' : 'width: 50px; height: 50px; font-size: 20px;'}">
        ${String(num).padStart(2, '0')}
        <span class="draw-ball-zodiac" style="${isSpecial ? '' : 'font-size: 10px;'}">${z}</span>
        ${isSpecial ? '<div style="position: absolute; top: -10px; font-size: 10px; background: #f59e0b; padding: 0 4px; border-radius: 4px; color: black; font-weight: bold;">特</div>' : ''}
      </div>
    `;
  }).join('');

  let html = `
    <div class="settle-result-container">
      <!-- 开奖号码信息 -->
      <div class="settle-result-header">
        <div class="settle-draw-info" style="flex-direction: column; align-items: start;">
          <h3 style="margin-bottom: 12px; color: #94a3b8; font-size: 14px;">本期开奖号码</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
            ${drawBallsHtml}
          </div>
          <div class="settle-draw-attrs">
            <span style="color: #64748b; font-size: 12px; margin-right: 8px;">特码属性:</span>
            ${attrs.map(a => `<span class="draw-attr-tag ${a.class}">${a.text}</span>`).join('')}
          </div>
        </div>
        
        <!-- 结算概要 -->
        <div class="settle-summary-grid">
          <div class="settle-summary-card">
            <div class="settle-summary-label">总投注笔数</div>
            <div class="settle-summary-value">${results.totalBets}</div>
          </div>
          <div class="settle-summary-card">
            <div class="settle-summary-label">总投注金额</div>
            <div class="settle-summary-value">¥${results.totalBetAmount.toFixed(2)}</div>
          </div>
          <div class="settle-summary-card">
            <div class="settle-summary-label">中奖笔数</div>
            <div class="settle-summary-value win-count">${results.winCount}</div>
          </div>
          <div class="settle-summary-card">
            <div class="settle-summary-label">总赔付</div>
            <div class="settle-summary-value loss">¥${results.totalPayout.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <!-- 盈亏大字显示 -->
      <div class="settle-profit-banner ${bannerClass}">
        <div class="settle-profit-title">庄家本期盈亏</div>
        <div class="settle-profit-amount ${profitClass}">${profitSign}¥${Math.abs(results.profit).toFixed(2)}</div>
        <div class="settle-profit-subtitle">
          收入 ¥${results.totalBetAmount.toFixed(2)} - 赔付 ¥${results.totalPayout.toFixed(2)} = ${profitSign}¥${Math.abs(results.profit).toFixed(2)}
        </div>
      </div>`;

  // 中奖订单明细
  if (winBets.length > 0) {
    html += `
      <div class="settle-bets-section">
        <h3>🎉 中奖订单 (${winBets.length} 单)</h3>
        <table class="settle-bets-table">
          <thead>
            <tr>
              <th>订单号</th>
              <th>玩家</th>
              <th>号码</th>
              <th>每注</th>
              <th>赔付</th>
              <th>结果</th>
            </tr>
          </thead>
          <tbody>
            ${winBets.map(bet => {
      const numbersHtml = bet.betNumbers.map(n => {
        const bWave = getNumberWaveColor(n);
        const isWinNum = n === specialNumber; // Changed from drawNumber to specialNumber
        return `<span class="number-badge ball-${bWave}" ${isWinNum ? 'style="box-shadow: 0 0 8px #fbbf24; outline: 2px solid #f59e0b;"' : ''}>${String(n).padStart(2, '0')}</span>`;
      }).join(' ');
      return `
                <tr>
                  <td class="col-order-id">${bet.orderId}</td>
                  <td class="td-player">${bet.playerName}</td>
                  <td class="td-number">${numbersHtml}</td>
                  <td class="td-amount">¥${bet.betAmountPerNumber.toFixed(2)}</td>
                  <td class="td-payout payout-win">-¥${bet.payout.toFixed(2)}</td>
                  <td><span class="settle-result-badge badge-win">${bet.winNumbers.length}中</span></td>
                </tr>`;
    }).join('')}
          </tbody>
        </table>
      </div>`;
  }

  // 未中奖订单明细
  if (loseBets.length > 0) {
    html += `
      <div class="settle-bets-section">
        <h3>💼 未中奖订单 (${loseBets.length} 单)</h3>
        <table class="settle-bets-table">
          <thead>
            <tr>
              <th>订单号</th>
              <th>玩家</th>
              <th>号码</th>
              <th>每注</th>
              <th>收入</th>
              <th>结果</th>
            </tr>
          </thead>
          <tbody>
            ${loseBets.map(bet => {
      const numbersHtml = bet.betNumbers.map(n => {
        const bWave = getNumberWaveColor(n);
        return `<span class="number-badge ball-${bWave}">${String(n).padStart(2, '0')}</span>`;
      }).join(' ');
      return `
                <tr>
                  <td class="col-order-id">${bet.orderId}</td>
                  <td class="td-player">${bet.playerName}</td>
                  <td class="td-number">${numbersHtml}</td>
                  <td class="td-amount">¥${bet.betAmountPerNumber.toFixed(2)}</td>
                  <td class="td-payout payout-lose">+¥${bet.totalAmount.toFixed(2)}</td>
                  <td><span class="settle-result-badge badge-lose">未中</span></td>
                </tr>`;
    }).join('')}
          </tbody>
        </table>
      </div>`;
  }

  // 无投注提示
  if (results.totalBets === 0) {
    html += `
      <div class="settle-bets-section">
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <div class="empty-text">本期无投注记录</div>
        </div>
      </div>`;
  }

  html += '</div>';

  container.innerHTML = html;
}

// 显示历史记录详情 (使用 Modal)
function showHistoryDetail(id) {
  const record = drawHistory.find(r => r.id === id);
  if (!record) return;

  // 创建或获取 Modal 元素
  let modal = document.getElementById('history-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'history-detail-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 900px; width: 90%; background: #0f172a; border: 1px solid #334155; border-radius: 12px; color: #f1f5f9;">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid #334155;">
          <h2 id="history-modal-title" style="margin: 0; font-size: 18px;">第 -- 期 详情</h2>
          <button class="btn-close-modal" style="background: none; border: none; color: #94a3b8; font-size: 24px; cursor: pointer;">×</button>
        </div>
        <div class="modal-body" id="history-modal-body" style="padding: 24px;">
           <!-- Content -->
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.btn-close-modal').addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // 填充数据
  const modalTitle = modal.querySelector('#history-modal-title');
  const modalBody = modal.querySelector('#history-modal-body');

  modalTitle.textContent = `第 ${record.period} 期 开奖详情`;

  // 构造开奖球 HTML
  const ballsHtml = record.drawNumbers.map((n, idx) => {
    const bColor = getNumberWaveColor(n);
    const isSpecial = idx === 6;
    const z = getZodiacForNumber(n);
    return `
        <div class="settle-draw-ball ball-${bColor}" style="${isSpecial ? 'transform: scale(1.1);' : 'width: 40px; height: 40px; font-size: 16px;'}">
          ${String(n).padStart(2, '0')}
          ${isSpecial ? `<div style="position: absolute; top: -10px; font-size: 10px; background: #f59e0b; padding: 0 4px; border-radius: 4px; color: black; font-weight: bold;">特</div>` : ''}
          <div style="font-size: 10px; margin-top:2px;">${z}</div>
        </div>
      `;
  }).join('');

  // 统计信息
  const profitClass = record.profit > 0 ? 'text-green' : record.profit < 0 ? 'text-red' : '';
  const profitSign = record.profit >= 0 ? '+' : '';
  const bets = record.bets || [];

  const winBets = bets.filter(b => b.hasWin);
  const loseBets = bets.filter(b => !b.hasWin);

  let html = `
    <div class="history-detail-header">
       <div class="history-detail-time">开奖时间: ${record.drawTime}</div>
       <div style="display: flex; gap: 8px; justify-content: center; margin: 20px 0;">
         ${ballsHtml}
       </div>
       <div class="history-detail-summary">
          <div class="summary-item">
            <div class="summary-label">总订单</div>
            <div class="summary-val">${record.totalBets}</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">总金额</div>
            <div class="summary-val">¥${record.totalBetAmount.toFixed(2)}</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">总赔付</div>
            <div class="summary-val loss">¥${record.totalPayout.toFixed(2)}</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">庄家盈亏</div>
            <div class="summary-val ${profitClass}" style="font-size: 20px;">${profitSign}¥${Math.abs(record.profit).toFixed(2)}</div>
          </div>
       </div>
    </div>
    
    <div class="history-detail-tabs">
       <button class="tab-btn active" onclick="switchHistoryTab('all')">所有订单 (${bets.length})</button>
       <button class="tab-btn" onclick="switchHistoryTab('win')">中奖订单 (${winBets.length})</button>
       <button class="tab-btn" onclick="switchHistoryTab('lose')">未中订单 (${loseBets.length})</button>
    </div>
    
    <div class="history-detail-content">
       <div id="history-tab-all" class="history-tab-pane active">
          ${renderBetTable(bets)}
       </div>
       <div id="history-tab-win" class="history-tab-pane">
          ${renderBetTable(winBets)}
       </div>
       <div id="history-tab-lose" class="history-tab-pane">
          ${renderBetTable(loseBets)}
       </div>
    </div>
  `;

  modalBody.innerHTML = html;

  // 注入 Tab 切换逻辑 (临时挂载到 window)
  window.switchHistoryTab = function (tabName) {
    modal.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    // 简单根据文本匹配或重新实现
    if (event && event.target) event.target.classList.add('active');

    modal.querySelectorAll('.history-tab-pane').forEach(p => p.classList.remove('active'));
    const pane = modal.querySelector(`#history-tab-${tabName}`);
    if (pane) pane.classList.add('active');
  };

  modal.classList.add('active');
}

function renderBetTable(bets) {
  if (!bets || bets.length === 0) return '<div style="text-align:center; padding: 40px; color: #64748b;">暂无订单记录</div>';

  window.toggleOrderDetail = function (btn) {
    const row = btn.closest('tr').nextElementSibling;
    if (row && row.classList.contains('detail-row')) {
      const isVisible = row.style.display !== 'none';
      row.style.display = isVisible ? 'none' : 'table-row';
      btn.textContent = isVisible ? '详情' : '收起';
    }
  };

  return `
      <table class="settle-bets-table" style="width: 100%; text-align: left; border-collapse: separate; border-spacing: 0;">
        <thead>
          <tr style="background: #1e293b; color: #94a3b8; font-size: 13px;">
            <th style="padding: 12px; border-bottom: 1px solid #334155;">订单号/时间</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">玩家</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">玩法/赔率</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">内容摘要</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">单价</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">总额</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">结果(回报)</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">庄家盈亏</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">操作</th>
          </tr>
        </thead>
        <tbody style="font-size: 13px;">
          ${bets.map((bet, index) => {
    // 庄家视角盈亏 = 投注总额 - 赔付金额
    const houseProfit = bet.totalAmount - bet.payout;
    // 庄家赢(正数)显示绿色(盈利)，庄家输(负数)显示红色(亏损)
    const profitClass = houseProfit >= 0 ? 'text-green' : 'text-red';
    const profitStr = houseProfit >= 0 ? `+¥${houseProfit.toFixed(2)}` : `-¥${Math.abs(houseProfit).toFixed(2)}`;

    // 结果显示：中奖显示总赔付(含本)，未中显示0
    const resultAmount = bet.hasWin ? `¥${bet.payout.toFixed(2)}` : `0`;
    const resultClass = bet.hasWin ? 'text-red' : '';

    // 简化的号码显示
    const numCount = bet.betNumbers.length;
    const shortNums = bet.betNumbers.slice(0, 6).join(', ');
    const summary = numCount > 6 ? `${shortNums}... (共${numCount}注)` : shortNums;

    // 详细号码显示，直接在列表中标记中奖号码
    const allNums = bet.betNumbers.map(n => {
      const isWin = bet.winNumbers.includes(n);
      const wave = getNumberWaveColor(n);
      // 中奖号码样式：带金色边框和发光效果
      const winStyle = isWin
        ? 'border: 2px solid #f59e0b; box-shadow: 0 0 8px rgba(245, 158, 11, 0.6); transform: scale(1.1); z-index: 10;'
        : 'border: 1px solid transparent; opacity: 0.8;';

      return `<span style="display:inline-block; width:24px; height:24px; line-height:22px; text-align:center; border-radius:50%; background:#334155; margin:3px; color:#fff; position:relative; ${winStyle}" class="ball-${wave}">
                    ${n}
                    ${isWin ? '<span style="position:absolute; top:-8px; right:-8px; background:#ef4444; color:white; font-size:9px; padding:0 3px; border-radius:4px; line-height:1.2;">中</span>' : ''}
                </span>`;
    }).join('');

    // 赔率显示
    const oddsDisplay = bet.odds ? `@${bet.odds}` : '@47.0';

    return `
              <tr style="border-bottom: 1px solid #1e293b; transition: background 0.2s;">
                <td style="padding: 12px; color: #e2e8f0; font-family: monospace;">
                    <div style="font-weight:bold; color: #f8fafc;">${bet.orderId}</div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${bet.timestamp || '-'}</div>
                </td>
                <td style="padding: 12px;">${bet.playerName}</td>
                <td style="padding: 12px;">
                    <span style="background:#334155; padding:2px 6px; border-radius:4px; font-size:11px; margin-right: 4px;">${bet.betType || '特码'}</span>
                    <span style="color: #fbbf24; font-size: 11px; font-weight: bold;">${oddsDisplay}</span>
                </td>
                <td style="padding: 12px; color: #a5b4fc;">${summary}</td>
                <td style="padding: 12px;">¥${bet.betAmountPerNumber.toFixed(0)}</td>
                <td style="padding: 12px; font-weight:bold;">¥${bet.totalAmount.toFixed(0)}</td>
                <td style="padding: 12px;">
                    <span class="${resultClass}" style="font-weight:bold;">${resultAmount}</span>
                </td>
                <td style="padding: 12px;">
                    <span class="${profitClass}" style="font-weight:bold;">${profitStr}</span>
                </td>
                <td style="padding: 12px;">
                    <button onclick="toggleOrderDetail(this)" style="background:transparent; border:1px solid #475569; color:#94a3b8; padding:4px 10px; border-radius:4px; cursor:pointer; font-size: 12px; transition: all 0.2s;">详情</button>
                </td>
              </tr>
              <tr class="detail-row" style="display:none; background: #0b1120;">
                <td colspan="9" style="padding: 0; border-bottom: 1px solid #334155;">
                    <div style="padding: 16px 20px; box-shadow: inset 0 0 15px rgba(0,0,0,0.4); display: flex; gap: 24px;">
                       <div style="flex:1;">
                          <div style="font-size:12px; color:#94a3b8; margin-bottom:8px; display:flex; justify-content:space-between;">
                             <span>投注明细 (${numCount}注)</span>
                             <span>${bet.winNumbers.length > 0 ? `<span style="color:#ef4444;">命中 ${bet.winNumbers.length} 注</span>` : '未中奖'}</span>
                          </div>
                          <div style="line-height:2; display: flex; flex-wrap: wrap; align-items: center;">${allNums}</div>
                       </div>
                       
                       ${bet.hasWin ? `
                       <div style="min-width: 120px; text-align: right; display: flex; flex-direction: column; justify-content: center; border-left: 1px dashed #334155; padding-left: 20px;">
                          <div style="font-size:12px; color:#64748b;">中奖金额</div>
                          <div style="font-size: 24px; color:#ef4444; font-weight:bold; margin: 4px 0;">¥${bet.payout.toFixed(0)}</div>
                          <div style="font-size:11px; color:#94a3b8;">赔率 ${oddsDisplay}</div>
                       </div>
                       ` : ''}
                    </div>
                </td>
              </tr>
            `;
  }).join('')}
        </tbody>
      </table>
    `;
}

// 保存到历史记录
// 保存到历史记录
// 保存到历史记录
function saveToHistory(drawNumbers, results) {
  // 兼容单一号码
  if (typeof drawNumbers === 'number') {
    drawNumbers = [0, 0, 0, 0, 0, 0, drawNumbers];
  }

  const record = {
    id: Date.now(),
    period: currentPeriod,
    drawNumbers: drawNumbers, // 保存数组
    drawNumber: drawNumbers[6], // 兼容旧字段
    drawTime: new Date().toLocaleString('zh-CN'),
    totalBets: results.totalBets,
    totalBetAmount: results.totalBetAmount,
    winCount: results.winCount,
    totalPayout: results.totalPayout,
    profit: results.profit,
    // 保存详细订单信息，以便后续查看
    bets: results.bets.map(b => ({
      orderId: b.orderId,
      playerName: b.playerName,
      betType: b.betType,
      betNumbers: b.betNumbers,
      betAmountPerNumber: b.betAmountPerNumber,
      totalAmount: b.totalAmount,
      timestamp: b.timestamp,
      winNumbers: b.winNumbers,
      hasWin: b.hasWin,
      payout: b.payout,
      odds: b.odds || 47.0 // 保存赔率
    }))
  };

  // 覆盖式：移除同期旧记录，使用最新数据
  drawHistory = drawHistory.filter(r => r.period !== currentPeriod);
  drawHistory.unshift(record);

  // 保存到localStorage
  try {
    localStorage.setItem('drawHistory', JSON.stringify(drawHistory));
  } catch (e) { /* ignore */ }
}

// 渲染历史开奖记录
// 渲染历史开奖记录
// 渲染历史开奖记录
function renderDrawHistory() {
  const container = document.getElementById('settle-history-list');
  const countEl = document.getElementById('history-count');

  if (!container) return;

  // 1. 数据去重 (保留每期最新的一条)
  const uniqueDrawHistory = [];
  const seenPeriods = new Set();
  // 假设 drawHistory 是按时间倒序(unshift)的，直接遍历保留遇到的第一个即可
  for (const record of drawHistory) {
    if (!seenPeriods.has(record.period)) {
      uniqueDrawHistory.push(record);
      seenPeriods.add(record.period);
    }
  }

  if (countEl) countEl.textContent = `共 ${uniqueDrawHistory.length} 期`;

  if (uniqueDrawHistory.length === 0) {
    container.innerHTML = `
      <div class="empty-history">
        <div class="empty-icon">📜</div>
        <div class="empty-text">暂无历史记录</div>
      </div>`;
    return;
  }

  container.innerHTML = uniqueDrawHistory.map(record => {
    // 兼容新旧数据格式
    let numbers = [];

    if (record.drawNumbers && Array.isArray(record.drawNumbers)) {
      numbers = record.drawNumbers;
      while (numbers.length < 7) numbers.push(0);
    } else {
      const special = record.drawNumber || 0;
      numbers = [0, 0, 0, 0, 0, 0, special];
    }

    // 确定盈亏样式
    const profitColor = record.profit > 0 ? '#4ade80' : record.profit < 0 ? '#ef4444' : '#94a3b8';
    const profitStr = record.profit >= 0 ? `+¥${record.profit.toFixed(2)}` : `-¥${Math.abs(record.profit).toFixed(2)}`;

    // 生成号码球 (紧凑版，带生肖)
    const ballsHtml = numbers.map((n, idx) => {
      if (!n) return '';
      const bColor = getNumberWaveColor(n);
      const isSpecial = idx === 6;
      const specialClass = isSpecial ? 'special' : '';
      const z = getZodiacForNumber(n);

      return `<div style="display:inline-flex; flex-direction:column; align-items:center; margin:0 2px;">
        <div class="history-mini-ball ball-${bColor} ${specialClass}" style="width:22px; height:22px; line-height:22px; font-size:11px; position:relative;">
          ${String(n).padStart(2, '0')}
          ${isSpecial ? '<span style="position:absolute; top:-5px; right:-5px; font-size:7px; background:#f59e0b; padding:0 2px; border-radius:3px; color:#000; font-weight:bold; line-height:1.2;">特</span>' : ''}
        </div>
        <span style="font-size:9px; color:#64748b; line-height:1; margin-top:1px;">${z}</span>
      </div>`;
    }).join('');

    return `
      <div class="history-item" onclick="showHistoryDetail(${record.id})" style="cursor:pointer; padding:8px 12px; display:flex; align-items:center; gap:12px; border-bottom:1px solid #1e293b;">
        <div style="min-width:110px; flex-shrink:0;">
          <div style="font-size:13px; font-weight:bold; color:#e2e8f0;">第 ${record.period} 期</div>
          <div style="font-size:10px; color:#475569; margin-top:1px;">${record.drawTime}</div>
        </div>
        <div style="display:flex; align-items:center; flex:1;">${ballsHtml}</div>
        <div style="display:flex; gap:16px; flex-shrink:0; align-items:center;">
          <div style="text-align:center;"><div style="font-size:10px; color:#64748b;">投注</div><div style="font-size:12px; font-weight:bold; color:#cbd5e1;">${record.totalBets}笔</div></div>
          <div style="text-align:center;"><div style="font-size:10px; color:#64748b;">收入</div><div style="font-size:12px; font-weight:bold; color:#cbd5e1;">¥${record.totalBetAmount.toFixed(0)}</div></div>
          <div style="text-align:center;"><div style="font-size:10px; color:#64748b;">赔付</div><div style="font-size:12px; font-weight:bold; color:#f87171;">¥${record.totalPayout.toFixed(0)}</div></div>
          <div style="text-align:center;"><div style="font-size:10px; color:#64748b;">盈亏</div><div style="font-size:12px; font-weight:bold; color:${profitColor};">${profitStr}</div></div>
        </div>
      </div>`;
  }).join('');
}


// 清空历史记录
// 清空历史记录
function clearDrawHistory() {
  if (drawHistory.length === 0) {
    showToast('没有可清空的历史记录', 'error');
    return;
  }

  if (!confirm('确定要清空所有历史开奖记录吗？此操作不可恢复！')) {
    return;
  }

  drawHistory = [];
  try {
    localStorage.removeItem('drawHistory');
  } catch (e) { /* ignore */ }

  renderDrawHistory();
  showToast('历史记录已清空', 'success');
}

// 初始化结算页面
// 初始化结算页面
function initSettlementPage() {
  // 更新投注概览
  updateSettleInfo();

  // 渲染历史
  renderDrawHistory();

  // 绑定获取开奖按钮
  const fetchBtn = document.getElementById('btn-fetch-draw');
  if (fetchBtn) {
    fetchBtn.addEventListener('click', fetchLatestResult);
  }

  // 绑定确认开奖按钮
  const settleBtn = document.getElementById('btn-settle');
  if (settleBtn) {
    settleBtn.addEventListener('click', performSettlement);
  }

  // 绑定输入框回车跳跃
  const inputs = document.querySelectorAll('.settle-draw-input');
  inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      // 两个数字自动跳转下一个
      if (input.value.length >= 2) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
    });

    input.addEventListener('keydown', (e) => {
      // 回车键处理
      if (e.key === 'Enter') {
        e.preventDefault();
        if (input.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else if (index === inputs.length - 1) {
          // 最后一个回车触发开奖
          performSettlement();
        }
      }
      // Backspace回退
      if (e.key === 'Backspace' && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  // 清空历史按钮
  const clearHistoryBtn = document.getElementById('btn-clear-history');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', clearDrawHistory);
  }
}

// 页面加载完成后初始化结算页面
document.addEventListener('DOMContentLoaded', () => {
  initSettlementPage();
});
