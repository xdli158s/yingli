import { numberData, filterCategories, keywordMap, filterMap } from './constants.js';

export { numberData, filterCategories, keywordMap, filterMap };

export function normalizePeriod(period) {
    const digits = String(period || '').replace(/\D/g, '');
    if (!digits) return '';
    return digits.length >= 7 ? digits.slice(0, 7) : digits;
}

export function getNumberWaveColor(number) {
    const waves = Object.entries(numberData.wave || {});
    for (let i = 0; i < waves.length; i += 1) {
        const [, numbers] = waves[i];
        if (Array.isArray(numbers) && numbers.includes(number)) {
            if (i === 0) return 'red';
            if (i === 1) return 'blue';
            return 'green';
        }
    }
    return 'none';
}

export function getZodiacForNumber(number) {
    for (const [zodiac, numbers] of Object.entries(numberData.zodiac || {})) {
        if (Array.isArray(numbers) && numbers.includes(number)) return zodiac;
    }
    return '';
}

export function getFilterCategory(filterKey) {
    for (const [category, filters] of Object.entries(filterCategories || {})) {
        if (Array.isArray(filters) && filters.includes(filterKey)) return category;
    }
    return 'custom';
}

export function generateOrderId(period, id) {
    const periodNum = normalizePeriod(period);
    return `${periodNum}-${id}`;
}

export function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        if (container.contains(toast)) container.removeChild(toast);
    }, 2000);
}

export function calculateCurrentPeriod() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const beijingTime = new Date(utc + 8 * 60 * 60 * 1000);

    const start = new Date(beijingTime.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((beijingTime - start) / (1000 * 60 * 60 * 24));
    return `${beijingTime.getFullYear()}${String(dayOfYear).padStart(3, '0')}`;
}

export function formatPeriodDisplay(period) {
    return normalizePeriod(period) || String(period || '');
}

export function getNumberAttributes(num) {
    const attrs = [];

    const waveColor = getNumberWaveColor(num);
    const waveNames = { red: '红波', blue: '蓝波', green: '绿波', none: '无波色' };
    attrs.push({ text: waveNames[waveColor], class: `tag-${waveColor}` });

    attrs.push({ text: num >= 25 ? '大' : '小', class: '' });
    attrs.push({ text: num % 2 === 1 ? '单' : '双', class: '' });
    attrs.push({ text: num % 10 >= 5 ? '尾大' : '尾小', class: '' });

    const zodiac = getZodiacForNumber(num);
    if (zodiac) attrs.push({ text: zodiac, class: '' });

    for (const [name, numbers] of Object.entries(numberData.element || {})) {
        if (Array.isArray(numbers) && numbers.includes(num)) {
            attrs.push({ text: `五行·${name}`, class: '' });
            break;
        }
    }

    const wild = numberData.beast && Object.values(numberData.beast)[0];
    if (Array.isArray(wild)) {
        attrs.push({ text: wild.includes(num) ? '野兽' : '家兽', class: '' });
    }

    return attrs;
}

export function parseNumberInput(input) {
    const numbers = new Set();
    if (!input || !input.trim()) return [];

    const chunks = input
        .split(/[\s,，;；|]+/)
        .map((part) => part.trim())
        .filter(Boolean);

    const appendByKeyword = (keyword) => {
        const filterKey = keywordMap[keyword];
        if (!filterKey) return false;

        if (Array.isArray(filterMap[filterKey])) {
            for (const n of filterMap[filterKey]) numbers.add(n);
            return true;
        }

        if (Array.isArray(numberData.zodiac[filterKey])) {
            for (const n of numberData.zodiac[filterKey]) numbers.add(n);
            return true;
        }

        return false;
    };

    for (const chunk of chunks) {
        const rangeMatch = chunk.match(/^(\d+)[-~](\d+)$/);
        if (rangeMatch) {
            const start = Number(rangeMatch[1]);
            const end = Number(rangeMatch[2]);
            const lo = Math.min(start, end);
            const hi = Math.max(start, end);
            for (let i = lo; i <= hi; i += 1) {
                if (i >= 1 && i <= 49) numbers.add(i);
            }
            continue;
        }

        const num = Number(chunk);
        if (Number.isInteger(num) && num >= 1 && num <= 49) {
            numbers.add(num);
            continue;
        }

        if (Array.isArray(numberData.zodiac[chunk])) {
            for (const n of numberData.zodiac[chunk]) numbers.add(n);
            continue;
        }

        appendByKeyword(chunk);
    }

    return [...numbers].sort((a, b) => a - b);
}

export function initNumberStats() {
    const data = [];
    for (let i = 1; i <= 49; i += 1) {
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
