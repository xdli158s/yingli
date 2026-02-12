import { showToast } from '../utils/common.js';

// API Client Helper
export const API = {
    async getBets(period) {
        try {
            const res = await fetch(`/api/bets${period ? '?period=' + period : ''}`);
            if (!res.ok) throw new Error('Failed to fetch bets');
            return await res.json();
        } catch (e) {
            console.error(e);
            showToast('加载投注记录失败', 'error');
            return [];
        }
    },
    async createBet(bet) {
        try {
            const res = await fetch('/api/bets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bet)
            });
            if (!res.ok) throw new Error('Failed to create bet');
            return await res.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    async updateBetPlayer(data) {
        try {
            const res = await fetch('/api/bets', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to update player');
            return await res.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    async getHistory() {
        try {
            const res = await fetch('/api/history');
            if (!res.ok) throw new Error('Failed to fetch history');
            return await res.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    async getLatestDraw() {
        try {
            const res = await fetch('/api/latest-draw');
            if (!res.ok) throw new Error('Failed to fetch latest draw');
            return await res.json();
        } catch (e) {
            console.error(e);
            return null;
        }
    },
    async settle(data) {
        try {
            const res = await fetch('/api/settle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to settle');
            return await res.json();
        } catch (e) {
            throw e;
        }
    }
};
