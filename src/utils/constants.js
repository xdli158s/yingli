// ========== 号码映射数据定义 ==========
export const numberData = {
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

    // 五行
    element: {
        '金': [1, 2, 15, 16, 23, 24, 31, 32, 45, 46],
        '木': [7, 8, 21, 22, 29, 30, 37, 38],
        '水': [13, 14, 27, 28, 35, 36, 43, 44],
        '火': [5, 6, 11, 12, 19, 20, 33, 34, 41, 42, 49],
        '土': [3, 4, 9, 10, 17, 18, 25, 26, 39, 40, 47, 48]
    },

    // 大小 (1-24 小, 25-49 大)
    size: {
        '大': Array.from({ length: 25 }, (_, i) => i + 25),
        '小': Array.from({ length: 24 }, (_, i) => i + 1)
    },

    // 尾大尾小 (0-4 为小, 5-9 为大)
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

    // 野兽/家畜
    beast: {
        '野兽': [1, 2, 3, 4, 13, 14, 15, 16, 25, 26, 27, 28, 37, 38, 39, 40, 49], // 蛇龙兔虎 猴(10,22,34,46) 鼠(6,18,30,42)
        '家畜': [5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 29, 30, 31, 32, 33, 34, 35, 36, 41, 42, 43, 44, 45, 46, 47, 48]
    },

    // 头数 (0-4头)
    head: {
        0: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        1: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        2: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        3: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        4: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
    },

    // 尾数 (0-9尾)
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
export const filterMap = {
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
export const filterCategories = {
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

// 关键字映射（用于解析输入）
export const keywordMap = {
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
