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


// 初始化号码统计数据（空状态）
function initNumberStats() {
  const data = [];
  for (let i = 1; i <= 49; i++) {
    data.push({
      number: i,
      amount: 0,
      bets: 0,
      payout: 0,
      riskRatio: 0,
      riskLevel: 'none'
    });
  }
  return data;
}

const mockData = initNumberStats();

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
        loadPeriodData(currentPeriod);
      } else if (page === 'analysis') {
        refreshAllAnalysis();
      }
    }, 50);
  });
});





// 渲染投注记录（表格形式 - 复用结算页面的订单表格）
function renderBettingRecords() {
  const container = document.querySelector('#page-betting .records-table-container');
  if (!container) return;

  if (bettingRecords.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">暂无投注记录</div></div>';
    return;
  }

  // 按时间倒序显示
  const sortedRecords = [...bettingRecords].sort((a, b) => b.createTime - a.createTime);

  // 使用 renderOrdersTable 渲染，传入未结算状态和允许删除
  container.innerHTML = renderOrdersTable(sortedRecords, { isSettled: false, allowDelete: true });
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
            <span class="bar-value">¥${amount.toFixed(2)} (${percentage}%)</span>
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

  // 更新期数选择器
  updatePeriodSelector();

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
      <div class="cell-amount">¥${item.amount.toFixed(2)}</div>
      <div class="cell-payout">赔${item.payout.toFixed(2)}</div>
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
        <span class="analysis-item-amount">¥${item.amount.toFixed(2)}</span>
      </div>
      <div class="analysis-item-bar">
        <div class="analysis-item-fill" style="width: ${item.percentage}%; background: ${item.color};"></div>
      </div>
      <div class="analysis-item-stats">
        <span>占比: ${item.percentage}%</span>
        <span>赔付: ¥${item.payout.toFixed(2)}</span>
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
  renderCategoryAnalysis('element-analysis', 'element', { '金': '#facc15', '木': '#10b981', '水': '#3b82f6', '火': '#ef4444', '土': '#854d0e' });
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

  // 获取相关订单 (优先使用真实记录)
  const ordersList = document.getElementById('orders-list');
  let relatedOrders = bettingRecords.filter(r => r.betNumbers.includes(item.number));

  // 如果没有真实记录但在Mock数据中有显示（仅限展示Demo情况），则生成符合真实结构的Mock数据

  if (relatedOrders.length > 0) {
    ordersList.innerHTML = `
      <table class="modal-orders-table" style="width: 100%; text-align: left; border-collapse: separate; border-spacing: 0; margin-top: 10px;">
        <thead>
          <tr style="background: rgba(255,255,255,0.05); color: #94a3b8; font-size: 12px;">
            <th style="padding: 10px;">订单/时间</th>
            <th style="padding: 10px;">玩家</th>
            <th style="padding: 10px;">玩法/赔率</th>
            <th style="padding: 10px;">投注内容</th>
            <th style="padding: 10px;">单注</th>
            <th style="padding: 10px;">投注额</th>
            <th style="padding: 10px;">潜在赔付</th>
          </tr>
        </thead>
        <tbody style="font-size: 13px; color: #e2e8f0;">
          ${relatedOrders.map(order => {
      const payout = (order.betAmountPerNumber || order.totalAmount) * 47;
      const singleNum = order.betNumbers[0]; // 简化显示取第一个

      // 详情行内容生成 (复用结算页面的逻辑)
      const numCount = order.betNumbers.length;
      const allNums = order.betNumbers.map(n => {
        const wave = getNumberWaveColor(n);
        // 暂时不计算中奖样式，因为这是未结算状态的查看，或者假设当前点开的号码是"中奖"号码?
        // 为了视觉效果，高亮当前查看的号码 item.number
        const isHighlight = n === item.number;
        const highlightStyle = isHighlight
          ? 'border: 2px solid #3b82f6; box-shadow: 0 0 8px rgba(59, 130, 246, 0.6); transform: scale(1.1); z-index: 10;'
          : 'border: 1px solid transparent; opacity: 0.8;';

        return `<span style="display:inline-block; width:24px; height:24px; line-height:22px; text-align:center; border-radius:50%; background:#334155; margin:3px; color:#fff; position:relative; ${highlightStyle}" class="ball-${wave}">
                            ${n}
                        </span>`;
      }).join('');

      return `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: background 0.2s;" onclick="toggleModalOrderDetail(this)" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
              <td style="padding: 10px;">
                <div style="font-family: monospace;">${order.orderId}</div>
                <div style="font-size: 11px; color: #64748b;">${order.timestamp || order.time}</div>
              </td>
              <td style="padding: 10px;">${order.playerName || order.player}</td>
              <td style="padding: 10px;">
                <span>${order.betType || order.type}</span> <span style="color: #f59e0b; font-size: 11px;">@47.0</span>
              </td>
              <td style="padding: 10px;">
                <span class="preview-number ball-${getNumberWaveColor(singleNum)}" style="display:inline-block; width:20px; height:20px; line-height:20px; text-align:center; border-radius:50%; background:#334155; font-size:11px;">${singleNum}</span>
                ${numCount > 1 ? `<span style="font-size:10px; color:#94a3b8; margin-left:4px;">等${numCount}注</span>` : ''}
              </td>
              <td style="padding: 10px;">¥${(order.betAmountPerNumber || order.amount).toFixed(2)}</td>
              <td style="padding: 10px;">¥${(order.totalAmount || order.amount).toFixed(2)}</td>
              <td style="padding: 10px; color: #f87171; font-weight: bold;">¥${payout.toFixed(2)}</td>
            </tr>
            <tr class="modal-detail-row" style="display:none; background: rgba(0,0,0,0.2);">
                <td colspan="7" style="padding: 0;">
                    <div style="padding: 15px; border-top: 1px dashed rgba(255,255,255,0.1);">
                        <div style="font-size:12px; color:#94a3b8; margin-bottom:8px;">完整投注内容 (${numCount}注):</div>
                        <div style="display: flex; flex-wrap: wrap;">${allNums}</div>
                        <div style="margin-top: 10px; font-size: 12px; color: #64748b; display: flex; gap: 20px;">
                            <span>单注金额: ¥${(order.betAmountPerNumber || order.amount).toFixed(2)}</span>
                            <span>总金额: ¥${(order.totalAmount || order.amount).toFixed(2)}</span>
                        </div>
                    </div>
                </td>
            </tr>
          `;
    }).join('')}
        </tbody>
      </table>
    `;
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





// 更新关键指标
function updateMetrics() {
  const totalBets = mockData.reduce((sum, item) => sum + item.amount, 0);
  const totalCount = mockData.reduce((sum, item) => sum + item.bets, 0);
  const maxPayoutItem = mockData.reduce((max, item) => item.payout > max.payout ? item : max, mockData[0]);

  document.getElementById('total-bets').textContent = `¥${totalBets.toFixed(2)}`;
  document.getElementById('total-change').textContent = `${totalCount} 笔`;
  document.getElementById('max-payout').textContent = `¥${maxPayoutItem.payout.toFixed(2)}`;
  document.getElementById('max-number').textContent = `号码 ${maxPayoutItem.number}`;
  document.getElementById('bet-count').textContent = totalCount;
  document.getElementById('avg-bet').textContent = `平均 ¥${(totalBets / totalCount).toFixed(2)}`;

  // 预期盈亏 (假设每个号码中奖概率相同)
  const expectedPayout = mockData.reduce((sum, item) => sum + item.payout, 0) / 49;
  const expectedProfit = totalBets - expectedPayout;
  document.getElementById('expected-profit').textContent = `¥${expectedProfit.toFixed(2)}`;
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
    const displayValue = type === 'bets' ? `${value}次` : `¥${value.toFixed(2)}`;
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


// 格式化期数显示（日期+期数）
function formatPeriodDisplay(period) {
  if (!period || period.length < 7) return period;

  const year = period.substring(0, 4);
  const dayOfYear = parseInt(period.substring(4, 7));

  // 计算日期
  const date = new Date(year, 0);
  date.setDate(dayOfYear);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day} 第${period}期`;
}

// 更新期数选择器
function updatePeriodSelector() {
  const selector = document.getElementById('period-selector');
  if (!selector) return;

  // 收集所有期数（当前期 + 历史期）
  const allPeriods = new Set();
  allPeriods.add(currentPeriod);

  drawHistory.forEach(record => {
    if (record.period) allPeriods.add(record.period);
  });

  // 按期数降序排列
  const sortedPeriods = Array.from(allPeriods).sort((a, b) => b.localeCompare(a));

  // 生成选项：首选项为"历史总记录"
  let options = '<option value="__HISTORY_ALL__">📊 历史总记录</option>';

  options += sortedPeriods.map(period => {
    const displayText = formatPeriodDisplay(period);
    const isCurrentPeriod = period === currentPeriod;
    return `<option value="${period}" ${isCurrentPeriod ? 'selected' : ''}>${displayText}${isCurrentPeriod ? ' (当前期)' : ''}</option>`;
  }).join('');

  selector.innerHTML = options;

  // 绑定选择事件
  selector.onchange = function () {
    const selectedValue = this.value;
    if (selectedValue === '__HISTORY_ALL__') {
      showHistoryList();
    } else {
      loadPeriodData(selectedValue);
    }
  };
}

// 显示历史总记录列表
function showHistoryList() {
  // 隐藏结算结果和订单详情
  document.getElementById('settlement-result').innerHTML = '';
  document.getElementById('settle-orders-section').style.display = 'none';

  // 隐藏输入区域 (保留期数选择器)
  const drawRow = document.querySelector('.settle-draw-row');
  const actionRow = document.querySelector('.settle-actions');
  if (drawRow) drawRow.style.display = 'none';
  if (actionRow) actionRow.style.display = 'none';

  // 显示历史列表
  const historySection = document.getElementById('settle-history-section');
  historySection.style.display = 'block';

  // 渲染历史记录
  renderDrawHistory();

  // 更新投注概要为空
  const summaryContainer = document.getElementById('settle-summary-header');
  if (summaryContainer) {
    summaryContainer.innerHTML = '<span class="info-stat" style="color: #94a3b8;">查看历史总记录</span>';
  }
}

// 加载指定期数的数据
function loadPeriodData(period) {
  // 隐藏历史列表
  document.getElementById('settle-history-section').style.display = 'none';

  // 获取输入区域相关元素
  const drawRow = document.querySelector('.settle-draw-row');
  const actionRow = document.querySelector('.settle-actions');

  // 如果是当前期，显示当前投注数据
  if (period === currentPeriod) {
    // 1. 显示输入区域
    if (drawRow) drawRow.style.display = ''; // 恢复默认显示 (flex)
    if (actionRow) actionRow.style.display = '';

    updateSettleInfo();
    // 清空开奖输入框
    document.querySelectorAll('.settle-draw-input').forEach(input => input.value = '');

    // 清空之前的结算结果显示
    document.getElementById('settlement-result').innerHTML = '';

    // 2. 显示当前期的所有订单 (未结算状态)
    // 即使未结算，也显示订单列表供查看
    const pendingResults = {
      bets: bettingRecords //直接使用当前的投注记录
    };
    renderOrdersTabs(pendingResults.bets, false);
    document.getElementById('settle-orders-section').style.display = 'block';

    return;
  }

  // 如果是历史期数
  // 1. 隐藏输入区域 (因为已经开奖了)
  if (drawRow) drawRow.style.display = 'none';
  if (actionRow) actionRow.style.display = 'none';

  // 查找历史记录
  const historyRecord = drawHistory.find(r => r.period === period);
  if (historyRecord) {
    // 显示历史期数的投注信息
    const summaryContainer = document.getElementById('settle-summary-header');
    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <span class="info-stat">订单 <strong>${historyRecord.totalBets}</strong> 笔</span>
        <span class="info-stat">投注总额 <strong class="amount">¥${historyRecord.totalBetAmount.toFixed(2)}</strong></span>
      `;
    }

    // 填充开奖号码 (虽然输入框隐藏了，但为了逻辑完整性还是填充一下，或者不需要)
    // fillDrawInputs(historyRecord.drawNumbers); 

    // 显示结算结果
    const results = {
      totalBets: historyRecord.totalBets,
      totalBetAmount: historyRecord.totalBetAmount,
      winCount: historyRecord.winCount,
      loseCount: historyRecord.totalBets - historyRecord.winCount,
      totalPayout: historyRecord.totalPayout,
      profit: historyRecord.profit,
      bets: historyRecord.bets || []
    };

    renderSettlementResult(historyRecord.drawNumbers, results);

    // 显示订单详情区
    renderOrdersTabs(results.bets);
  }
}

// 渲染订单详情标签页
function renderOrdersTabs(bets, isSettled = true) {
  const ordersSection = document.getElementById('settle-orders-section');
  if (!ordersSection) return;

  ordersSection.style.display = 'block';

  // 如果未结算，中奖/未中奖分类可能不准确，主要看"全部"
  const winBets = isSettled ? bets.filter(b => b.hasWin) : [];
  const loseBets = isSettled ? bets.filter(b => !b.hasWin) : [];

  // 更新标签计数
  document.getElementById('tab-count-all').textContent = bets.length;
  // 未结算时，中奖/未中奖数显示为 0 或 -
  document.getElementById('tab-count-win').textContent = isSettled ? winBets.length : 0;
  document.getElementById('tab-count-lose').textContent = isSettled ? loseBets.length : 0;

  // 渲染各个标签页内容
  document.getElementById('settle-orders-all').innerHTML = renderOrdersTable(bets, { isSettled: isSettled });
  document.getElementById('settle-orders-win').innerHTML = renderOrdersTable(winBets, { isSettled: isSettled });
  document.getElementById('settle-orders-lose').innerHTML = renderOrdersTable(loseBets, { isSettled: isSettled });

  // 绑定标签切换事件
  document.querySelectorAll('.settle-tab-btn').forEach(btn => {
    btn.onclick = function () {
      const tab = this.dataset.tab;

      // 更新按钮状态
      document.querySelectorAll('.settle-tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // 更新内容显示
      document.querySelectorAll('.settle-orders-pane').forEach(pane => pane.classList.remove('active'));
      document.getElementById(`settle-orders-${tab}`).classList.add('active');
    };
  });
}

// 渲染订单表格
// options: { isSettled: boolean, allowDelete: boolean }
function renderOrdersTable(bets, options = { isSettled: true, allowDelete: false }) {
  if (!bets || bets.length === 0) {
    return '<div style="text-align:center; padding: 60px 20px; color: #64748b; font-size: 14px;">暂无订单记录</div>';
  }

  return `
    <table class="settle-bets-table" style="width: 100%; text-align: left; border-collapse: separate; border-spacing: 0;">
      <thead>
        <tr style="background: #1e293b; color: #94a3b8; font-size: 13px;">
          <th style="padding: 12px; border-bottom: 1px solid #334155;">订单号/时间</th>
          <th style="padding: 12px; border-bottom: 1px solid #334155;">玩家</th>
          <th style="padding: 12px; border-bottom: 1px solid #334155;">玩法/赔率</th>
          <th style="padding: 12px; border-bottom: 1px solid #334155;">内容摘要</th>
          <th style="padding: 12px; border-bottom: 1px solid #334155;">单注</th>
          <th style="padding: 12px; border-bottom: 1px solid #334155;">投注额</th>
          <th style="padding: 12px; border-bottom: 1px solid #334155;">结果(回报)</th>
          <th style="padding: 12px; border-bottom: 1px solid #334155;">庄家盈亏</th>
          <th style="padding: 12px; border-bottom: 1px solid #334155;">操作</th>
        </tr>
      </thead>
      <tbody style="font-size: 13px;">
        ${bets.map((bet, index) => {
    let houseProfit, profitClass, profitStr, resultAmount, resultClass;

    if (options.isSettled) {
      houseProfit = bet.totalAmount - bet.payout;
      profitClass = houseProfit >= 0 ? 'text-green' : 'text-red';
      profitStr = houseProfit >= 0 ? `+¥${houseProfit.toFixed(2)}` : `-¥${Math.abs(houseProfit).toFixed(2)}`;

      resultAmount = bet.hasWin ? `¥${bet.payout.toFixed(2)}` : `0`;
      resultClass = bet.hasWin ? 'text-red' : '';
    } else {
      profitStr = '-';
      profitClass = '';
      resultAmount = '-';
      resultClass = '';
    }

    const numCount = bet.betNumbers.length;
    const shortNums = bet.betNumbers.slice(0, 6).join(', ');
    const summary = numCount > 6 ? `${shortNums}... (共${numCount}注)` : shortNums;

    const allNums = bet.betNumbers.map(n => {
      const isWin = options.isSettled && bet.winNumbers && bet.winNumbers.includes(n);
      const wave = getNumberWaveColor(n);
      const winStyle = isWin
        ? 'border: 2px solid #f59e0b; box-shadow: 0 0 8px rgba(245, 158, 11, 0.6); transform: scale(1.1); z-index: 10;'
        : 'border: 1px solid transparent; opacity: 0.8;';

      return `<span style="display:inline-block; width:24px; height:24px; line-height:22px; text-align:center; border-radius:50%; background:#334155; margin:3px; color:#fff; position:relative; ${winStyle}" class="ball-${wave}">
                      ${n}
                      ${isWin ? '<span style="position:absolute; top:-8px; right:-8px; background:#ef4444; color:white; font-size:9px; padding:0 3px; border-radius:4px; line-height:1.2;">中</span>' : ''}
                  </span>`;
    }).join('');

    const oddsDisplay = bet.odds ? `@${bet.odds}` : '@47.0';

    return `
            <tr style="border-bottom: 1px solid #1e293b; transition: background 0.2s;" onmouseover="this.style.background='#1e293b'" onmouseout="this.style.background='transparent'">
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
              <td style="padding: 12px;">¥${bet.betAmountPerNumber.toFixed(2)}</td>
              <td style="padding: 12px; font-weight:bold;">¥${bet.totalAmount.toFixed(2)}</td>
              <td style="padding: 12px;">
                  <span class="${resultClass}" style="font-weight:bold;">${resultAmount}</span>
              </td>
              <td style="padding: 12px;">
                  <span class="${profitClass}" style="font-weight:bold;">${profitStr}</span>
              </td>
              <td style="padding: 12px;">
                  <button type="button" class="btn-detail-toggle" onclick="window.toggleOrderDetail(this)" style="background:transparent; border:1px solid #475569; color:#94a3b8; padding:4px 10px; border-radius:4px; cursor:pointer; font-size: 12px; transition: all 0.2s; margin-right: 4px;">详情</button>
                  ${options.allowDelete ? `<button type="button" class="btn-delete-row" onclick="deleteBettingRecord('${bet.orderId}')" style="background:transparent; border:1px solid #ef4444; color:#ef4444; padding:4px 10px; border-radius:4px; cursor:pointer; font-size: 12px; transition: all 0.2s;">删除</button>` : ''}
              </td>
            </tr>
            <tr class="detail-row" style="display:none; background: #0b1120;">
              <td colspan="9" style="padding: 0; border-bottom: 1px solid #334155;">
                  <div style="padding: 16px 20px; box-shadow: inset 0 0 15px rgba(0,0,0,0.4); display: flex; gap: 24px;">
                     <div style="flex:1;">
                        <div style="font-size:12px; color:#94a3b8; margin-bottom:8px; display:flex; justify-content:space-between;">
                           <span>投注明细 (${numCount}注)</span>
                           <span>${options.isSettled ? (bet.winNumbers && bet.winNumbers.length > 0 ? `<span style="color:#ef4444;">命中 ${bet.winNumbers.length} 注</span>` : '未中奖') : '<span style="color:#f59e0b;">待开奖</span>'}</span>
                        </div>
                        <div style="line-height:2; display: flex; flex-wrap: wrap; align-items: center;">${allNums}</div>
                     </div>
                     
                     ${bet.hasWin ? `
                     <div style="min-width: 120px; text-align: right; display: flex; flex-direction: column; justify-content: center; border-left: 1px dashed #334155; padding-left: 20px;">
                        <div style="font-size:12px; color:#64748b;">中奖金额</div>
                        <div style="font-size: 24px; color:#ef4444; font-weight:bold; margin: 4px 0;">¥${bet.payout.toFixed(2)}</div>
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
function updateSettleInfo() {
  const summaryContainer = document.getElementById('settle-summary-header');

  if (summaryContainer) {
    const totalBets = bettingRecords.length;
    const totalAmount = bettingRecords.reduce((sum, r) => sum + r.totalAmount, 0);

    summaryContainer.innerHTML = `
      <span class="info-stat">订单 <strong>${totalBets}</strong> 笔</span>
      <span class="info-stat">投注总额 <strong class="amount">¥${totalAmount.toFixed(2)}</strong></span>
    `;
  }

  // 更新期数选择器
  updatePeriodSelector();
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

    // 渲染订单详情标签页
    renderOrdersTabs(results.bets);

    // 更新历史记录展示
    renderDrawHistory();

    // 更新期数选择器
    updatePeriodSelector();

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

      if (betVal === specialNumber) isWin = true;

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
    // 特码直投默认赔率
    let odds = 47.0;

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


// 直接执行回调，不显示动画
function showDrawAnimation(finalNumber, callback) {
  callback();
}

// 渲染结算结果
function renderSettlementResult(drawNumbers, results) {
  const container = document.getElementById('settlement-result');

  if (typeof drawNumbers === 'number') {
    drawNumbers = [0, 0, 0, 0, 0, 0, drawNumbers];
  }

  const specialNumber = drawNumbers[6];
  const attrs = getNumberAttributes(specialNumber);

  const profitClass = results.profit > 0 ? 'profit' : results.profit < 0 ? 'loss' : 'neutral';
  const bannerClass = results.profit > 0 ? 'banner-profit' : results.profit < 0 ? 'banner-loss' : 'banner-neutral';
  const profitSign = results.profit >= 0 ? '+' : '';

  const winBets = results.bets.filter(b => b.hasWin);
  const loseBets = results.bets.filter(b => !b.hasWin);

  // 生成开奖号码球HTML - 紧凑版
  const drawBallsHtml = drawNumbers.map((num, idx) => {
    if (!num) return '';
    const wColor = getNumberWaveColor(num);
    const z = getZodiacForNumber(num);
    const isSpecial = idx === 6;
    return `<div style="display:inline-flex;flex-direction:column;align-items:center;margin:0 2px;">
      <div class="settle-draw-ball ball-${wColor}" style="${isSpecial ? 'width:48px;height:48px;font-size:20px;' : ''}">
        ${String(num).padStart(2, '0')}
        ${isSpecial ? '<span style="position:absolute;top:-8px;font-size:9px;background:#f59e0b;padding:0 3px;border-radius:3px;color:#000;font-weight:bold;">特</span>' : ''}
      </div>
      <span style="font-size:10px;color:#64748b;margin-top:2px;">${z}</span>
    </div>`;
  }).join('');

  let html = `
    <div class="settle-result-container">
      <div class="settle-result-header">
        <div class="settle-draw-info" style="flex-direction:column;align-items:start;">
          <div style="font-size:12px;color:#64748b;margin-bottom:8px;">开奖号码</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">${drawBallsHtml}</div>
          <div class="settle-draw-attrs">
            <span style="color:#64748b;font-size:11px;margin-right:6px;">特码:</span>
            ${attrs.map(a => `<span class="draw-attr-tag ${a.class}">${a.text}</span>`).join('')}
          </div>
        </div>
        <div class="settle-summary-grid">
          <div class="settle-summary-card">
            <div class="settle-summary-label">订单</div>
            <div class="settle-summary-value">${results.totalBets}</div>
          </div>
          <div class="settle-summary-card">
            <div class="settle-summary-label">投注额</div>
            <div class="settle-summary-value">¥${results.totalBetAmount.toFixed(2)}</div>
          </div>
          <div class="settle-summary-card">
            <div class="settle-summary-label">中奖</div>
            <div class="settle-summary-value win-count">${results.winCount}</div>
          </div>
          <div class="settle-summary-card">
            <div class="settle-summary-label">赔付</div>
            <div class="settle-summary-value loss">¥${results.totalPayout.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div class="settle-profit-banner ${bannerClass}">
        <div class="settle-profit-title">庄家盈亏</div>
        <div class="settle-profit-amount ${profitClass}">${profitSign}¥${Math.abs(results.profit).toFixed(2)}</div>
        <div class="settle-profit-subtitle">收入 ¥${results.totalBetAmount.toFixed(2)} − 赔付 ¥${results.totalPayout.toFixed(2)}</div>
      </div>`;



  html += '</div>';
  container.innerHTML = html;
}

// 全局定义切换详情函数 (确保挂载到 window)
window.toggleOrderDetail = function (btn) {
  // 查找当前行的下一行
  const tr = btn.closest('tr');
  if (!tr) return;

  const detailRow = tr.nextElementSibling;
  if (detailRow && detailRow.classList.contains('detail-row')) {
    const isVisible = detailRow.style.display !== 'none';
    detailRow.style.display = isVisible ? 'none' : 'table-row';
    btn.style.color = isVisible ? '#94a3b8' : '#3b82f6';
    btn.style.borderColor = isVisible ? '#475569' : '#3b82f6';
  }
};

// 模态框订单详情切换
window.toggleModalOrderDetail = function (row) {
  const detailRow = row.nextElementSibling;
  if (detailRow && detailRow.classList.contains('modal-detail-row')) {
    const isVisible = detailRow.style.display !== 'none';
    detailRow.style.display = isVisible ? 'none' : 'table-row';
    row.style.background = isVisible ? 'transparent' : 'rgba(255,255,255,0.08)';
  }
};

function renderBetTable(bets) {
  if (!bets || bets.length === 0) return '<div style="text-align:center; padding: 40px; color: #64748b;">暂无订单记录</div>';

  return `
      <table class="settle-bets-table" style="width: 100%; text-align: left; border-collapse: separate; border-spacing: 0;">
        <thead>
          <tr style="background: #1e293b; color: #94a3b8; font-size: 13px;">
            <th style="padding: 12px; border-bottom: 1px solid #334155;">订单号/时间</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">玩家</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">玩法/赔率</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">内容摘要</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">单注</th>
            <th style="padding: 12px; border-bottom: 1px solid #334155;">投注额</th>
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
    const resultText = bet.hasWin ? '中奖' : '未中奖';
    const resultColor = bet.hasWin ? '#ef4444' : '#94a3b8';
    const resultAmount = bet.hasWin ? `¥${bet.payout.toFixed(2)}` : `0`;

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
                <td style="padding: 12px;">¥${bet.betAmountPerNumber.toFixed(2)}</td>
                <td style="padding: 12px; font-weight:bold;">¥${bet.totalAmount.toFixed(2)}</td>
                <td style="padding: 12px;">
                    <div style="font-weight:bold; color: ${resultColor}; margin-bottom: 2px;">${resultText}</div>
                    <div style="font-size: 11px; color: ${bet.hasWin ? '#ef4444' : '#64748b'};">${resultAmount}</div>
                </td>
                <td style="padding: 12px;">
                    <span class="${profitClass}" style="font-weight:bold;">${profitStr}</span>
                </td>
                <td style="padding: 12px;">
                    <button type="button" class="btn-detail-toggle" onclick="window.toggleOrderDetail(this)" style="background:transparent; border:1px solid #475569; color:#94a3b8; padding:4px 10px; border-radius:4px; cursor:pointer; font-size: 12px; transition: all 0.2s;">详情</button>
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
                          <div style="font-size: 24px; color:#ef4444; font-weight:bold; margin: 4px 0;">¥${bet.payout.toFixed(2)}</div>
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
function renderDrawHistory() {
  const container = document.getElementById('settle-history-list');
  const summaryCard = document.getElementById('history-summary-card');

  if (!container) return;

  // 数据去重
  const uniqueDrawHistory = [];
  const seenPeriods = new Set();
  for (const record of drawHistory) {
    if (!seenPeriods.has(record.period)) {
      uniqueDrawHistory.push(record);
      seenPeriods.add(record.period);
    }
  }

  if (uniqueDrawHistory.length === 0) {
    container.innerHTML = `<div class="empty-history"><div class="empty-icon">📜</div><div class="empty-text">暂无历史记录</div></div>`;
    if (summaryCard) summaryCard.style.display = 'none';
    return;
  }

  // 计算总统计
  const totalStats = {
    totalPeriods: uniqueDrawHistory.length,
    totalBets: uniqueDrawHistory.reduce((sum, r) => sum + r.totalBets, 0),
    totalBetAmount: uniqueDrawHistory.reduce((sum, r) => sum + r.totalBetAmount, 0),
    totalPayout: uniqueDrawHistory.reduce((sum, r) => sum + r.totalPayout, 0),
    totalProfit: uniqueDrawHistory.reduce((sum, r) => sum + r.profit, 0),
    winPeriods: uniqueDrawHistory.filter(r => r.profit > 0).length,
    losePeriods: uniqueDrawHistory.filter(r => r.profit < 0).length
  };

  // 渲染总统计卡片
  if (summaryCard) {
    summaryCard.style.display = 'block';
    const profitClass = totalStats.totalProfit >= 0 ? 'text-green' : 'text-red';
    const profitSign = totalStats.totalProfit >= 0 ? '+' : '';

    summaryCard.innerHTML = `
      <div class="history-summary-header">
        <h3>📊 历史总统计</h3>
        <span class="summary-period-count">共 ${totalStats.totalPeriods} 期</span>
      </div>
      <div class="history-summary-grid">
        <div class="summary-stat-item">
          <div class="summary-stat-label">总订单数</div>
          <div class="summary-stat-value">${totalStats.totalBets}</div>
        </div>
        <div class="summary-stat-item">
          <div class="summary-stat-label">总投注额</div>
          <div class="summary-stat-value">¥${totalStats.totalBetAmount.toFixed(0)}</div>
        </div>
        <div class="summary-stat-item">
          <div class="summary-stat-label">总赔付</div>
          <div class="summary-stat-value text-red">¥${totalStats.totalPayout.toFixed(0)}</div>
        </div>
        <div class="summary-stat-item highlight">
          <div class="summary-stat-label">总盈亏</div>
          <div class="summary-stat-value ${profitClass}" style="font-size: 24px;">${profitSign}¥${Math.abs(totalStats.totalProfit).toFixed(0)}</div>
        </div>
        <div class="summary-stat-item">
          <div class="summary-stat-label">盈利期数</div>
          <div class="summary-stat-value text-green">${totalStats.winPeriods}</div>
        </div>
        <div class="summary-stat-item">
          <div class="summary-stat-label">亏损期数</div>
          <div class="summary-stat-value text-red">${totalStats.losePeriods}</div>
        </div>
      </div>
    `;
  }

  // 渲染历史列表
  container.innerHTML = uniqueDrawHistory.map(record => {
    let numbers = [];
    if (record.drawNumbers && Array.isArray(record.drawNumbers)) {
      numbers = record.drawNumbers;
      while (numbers.length < 7) numbers.push(0);
    } else {
      numbers = [0, 0, 0, 0, 0, 0, record.drawNumber || 0];
    }

    const profitColor = record.profit > 0 ? '#4ade80' : record.profit < 0 ? '#ef4444' : '#94a3b8';
    const profitStr = record.profit >= 0 ? `+¥${record.profit.toFixed(0)}` : `-¥${Math.abs(record.profit).toFixed(0)}`;

    const ballsHtml = numbers.map((n, idx) => {
      if (!n) return '';
      const bColor = getNumberWaveColor(n);
      const isSpecial = idx === 6;
      const specialClass = isSpecial ? 'special' : '';
      const z = getZodiacForNumber(n);
      return `<div style="display:inline-flex;flex-direction:column;align-items:center;margin:0 1px;">
        <div class="history-mini-ball ball-${bColor} ${specialClass}">${String(n).padStart(2, '0')}</div>
        <span style="font-size:9px;color:#64748b;line-height:1;margin-top:1px;">${z}</span>
      </div>`;
    }).join('');

    return `
      <div class="history-item" onclick="selectPeriodFromHistory('${record.period}')">
        <div style="min-width:100px;flex-shrink:0;">
          <div style="font-size:13px;font-weight:bold;color:#e2e8f0;">${record.period}</div>
          <div style="font-size:10px;color:#475569;margin-top:1px;">${record.drawTime}</div>
        </div>
        <div style="display:flex;align-items:center;flex:1;">${ballsHtml}</div>
        <div style="display:flex;gap:14px;flex-shrink:0;align-items:center;font-size:12px;">
          <span style="color:#cbd5e1;">${record.totalBets}笔</span>
          <span style="color:#cbd5e1;">¥${record.totalBetAmount.toFixed(0)}</span>
          <span style="color:#f87171;">-¥${record.totalPayout.toFixed(0)}</span>
          <span style="color:${profitColor};font-weight:bold;">${profitStr}</span>
        </div>
      </div>`;
  }).join('');
}

// 从历史列表中选择期数
function selectPeriodFromHistory(period) {
  const selector = document.getElementById('period-selector');
  if (selector) {
    selector.value = period;
    loadPeriodData(period);
  }
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

  // 初始化期数选择器
  updatePeriodSelector();

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

// 初始化模拟历史数据
function initMockHistoryIfNeeded() {
  // 按照要求，如果没有足够的数据（模拟10期），则重新生成
  if (drawHistory.length >= 10) return;

  // 清空现有数据以确保模拟效果的连贯性
  drawHistory = [];

  const mockPeriods = 10;
  let currentDate = new Date();

  // 从昨天开始往前推
  currentDate.setDate(currentDate.getDate() - 1);

  for (let i = 0; i < mockPeriods; i++) {
    const periodDate = new Date(currentDate);
    periodDate.setDate(periodDate.getDate() - i);

    // 生成期号 YYYY+DDD
    const year = periodDate.getFullYear();
    const start = new Date(year, 0, 0);
    const diff = periodDate - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOf = Math.floor(diff / oneDay);
    const dayOfYear = String(dayOf).padStart(3, '0');
    const period = `${year}${dayOfYear}`;

    // 随机开奖号码
    const drawNumbers = [];
    while (drawNumbers.length < 7) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!drawNumbers.includes(num)) drawNumbers.push(num);
    }
    const specialNumber = drawNumbers[6];

    // 随机生成一些订单
    const bets = [];
    const betCount = Math.floor(Math.random() * 20) + 5;
    let totalBetAmount = 0;
    let totalPayout = 0;

    for (let j = 0; j < betCount; j++) {
      const player = `玩家${Math.floor(Math.random() * 900) + 100}`;
      const amountPerNum = Math.floor(Math.random() * 50) + 10;

      // 随机玩法
      const betTypeRand = Math.random();
      let betType = '特码直投';
      let betNums = [];
      let payout = 0;
      let hasWin = false;
      let winNumbers = [];

      // 简单模拟
      const numCount = Math.floor(Math.random() * 10) + 1;
      while (betNums.length < numCount) {
        const n = Math.floor(Math.random() * 49) + 1;
        if (!betNums.includes(n)) betNums.push(n);
      }

      if (betNums.includes(specialNumber)) {
        hasWin = true;
        winNumbers.push(specialNumber);
        payout = amountPerNum * 47;
      }

      const totalAmount = amountPerNum * betNums.length;
      totalBetAmount += totalAmount;
      totalPayout += payout;

      bets.push({
        orderId: `${period}-${String(j + 1).padStart(3, '0')}`,
        playerName: player,
        betType: betType,
        betNumbers: betNums,
        betAmountPerNumber: amountPerNum,
        totalAmount: totalAmount,
        timestamp: periodDate.toLocaleString('zh-CN'),
        winNumbers: winNumbers,
        hasWin: hasWin,
        payout: payout,
        odds: 47.0
      });
    }

    const record = {
      id: Date.now() - i * 100000,
      period: period,
      drawNumbers: drawNumbers,
      drawNumber: specialNumber,
      drawTime: periodDate.toLocaleString('zh-CN'),
      totalBets: bets.length,
      totalBetAmount: totalBetAmount,
      winCount: bets.filter(b => b.hasWin).length,
      totalPayout: totalPayout,
      profit: totalBetAmount - totalPayout,
      bets: bets
    };

    drawHistory.push(record);
  }

  // 排序
  drawHistory.sort((a, b) => b.period - a.period);

  // 保存
  localStorage.setItem('drawHistory', JSON.stringify(drawHistory));
}

// 在初始化页面时调用
if (typeof initMockHistoryIfNeeded === 'function') {
  initMockHistoryIfNeeded();
}
