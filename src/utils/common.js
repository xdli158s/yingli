import { numberData, filterCategories, keywordMap, filterMap } from './constants.js';

export { numberData, filterCategories, keywordMap, filterMap };

// ========== 工具函数 ==========

// 获取号码的波色
export function getNumberWaveColor(number) {
    for (const [color, numbers] of Object.entries(numberData.wave)) {
        if (numbers.includes(number)) {
            return color === '红' ? 'red' : color === '蓝' ? 'blue' : 'green';
        }
    }
    return 'none';
}

// 获取号码的生肖
export function getZodiacForNumber(number) {
    for (const [zodiac, numbers] of Object.entries(numberData.zodiac)) {
        if (numbers.includes(number)) return zodiac;
    }
    return '';
}

// 获取筛选按钮的分类
export function getFilterCategory(filterKey) {
    for (const [category, filters] of Object.entries(filterCategories)) {
        if (filters.includes(filterKey)) return category;
    }
    return 'custom';
}

// 生成格式化订单号 (Period-ID -> 2026042-1)
export function generateOrderId(period, id) {
    // 提取数字：2026年第042期 -> 2026042
    const periodNum = period.replace(/\D/g, '');
    return `${periodNum}-${id}`;
}

// 显示提示消息
export function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container); // Append to body if not found
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        if (container.contains(toast)) container.removeChild(toast);
    }, 2000);
}

// 初始化当期期号：YYYY年第DDD期 (001-365/366)
export function calculateCurrentPeriod() {
    const now = new Date();
    // 使用北京时间 (UTC+8)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const beijingTime = new Date(utc + (3600000 * 8));

    const start = new Date(beijingTime.getFullYear(), 0, 0);
    const diff = beijingTime - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const year = beijingTime.getFullYear();
    return `${year}年第${String(dayOfYear).padStart(3, '0')}期`;
}

// 格式化期数显示
export function formatPeriodDisplay(period) {
    if (!period) return '';
    // 已经是 "第XXX期" 格式，直接返回，或者对于历史数据做兼容
    if (period.startsWith('第')) return period;

    // 兼容旧格式 YYYYDDD
    if (period.length === 7 && !isNaN(period)) {
        const year = period.substring(0, 4);
        const day = period.substring(4, 7);
        return `${year}年 第${day}期`;
    }

    return period;
}

// 获取号码所有属性标签 (moved from settlement section as it's a utility)
export function getNumberAttributes(num) {
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

// 解析输入字符串为号码数组
export function parseNumberInput(input) {
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

// 初始化号码统计数据（空状态）
export function initNumberStats() {
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
