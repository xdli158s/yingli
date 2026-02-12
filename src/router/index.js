import { createRouter, createWebHistory } from 'vue-router';
// Lazy load views
const AnalysisView = () => import('../views/AnalysisView.vue');
const BettingView = () => import('../views/BettingView.vue');
const SettlementView = () => import('../views/SettlementView.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/analysis'
        },
        {
            path: '/analysis',
            name: 'analysis',
            component: AnalysisView
        },
        {
            path: '/betting',
            name: 'betting',
            component: BettingView
        },
        {
            path: '/settlement',
            name: 'settlement',
            component: SettlementView
        }
    ]
});

export default router;
