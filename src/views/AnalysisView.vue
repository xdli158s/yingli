<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '../stores/app'
import { filterMap, getZodiacForNumber } from '../utils/common'
import PageHeader from '../components/PageHeader.vue'
import AppCard from '../components/AppCard.vue'
import StatCard from '../components/StatCard.vue'
import NumberChip from '../components/NumberChip.vue'

const store = useAppStore()
const riskSort = ref('amount')

const totalAmount = computed(() => store.mockData.reduce((sum, item) => sum + item.amount, 0))
const totalOrders = computed(() => store.bettingRecords.length)
const maxRiskItem = computed(() => store.mockData.reduce((max, item) => (item.payout > max.payout ? item : max), store.mockData[0]))
const hasMaxRisk = computed(() => Boolean(maxRiskItem.value && maxRiskItem.value.amount > 0))
const expectedProfit = computed(() => totalAmount.value - store.mockData.reduce((sum, item) => sum + item.payout, 0) / 49)

const riskRows = computed(() => {
  const rows = [...store.mockData].filter((item) => item.amount > 0)
  if (riskSort.value === 'amount') return rows.sort((a, b) => b.amount - a.amount)
  return rows.sort((a, b) => a.number - b.number)
})

const riskDistribution = computed(() => {
  const base = { high: 0, medium: 0, low: 0, none: 0 }
  for (const item of store.mockData) base[item.riskLevel] += 1
  return base
})

const maxAmount = computed(() => Math.max(...riskRows.value.map((item) => item.amount), 1))
const histogramRows = computed(() => riskRows.value.slice(0, 20))

const sumByNumbers = (numbers) =>
  store.mockData.reduce((sum, item) => (numbers.includes(item.number) ? sum + item.amount : sum), 0)

const sumPayoutByNumbers = (numbers) =>
  store.mockData.reduce((sum, item) => (numbers.includes(item.number) ? sum + item.payout : sum), 0)

const buildBreakdown = (title, rows) => {
  const totalAmount = rows.reduce((sum, item) => sum + item.amount, 0)
  const totalPayout = rows.reduce((sum, item) => sum + item.payout, 0)
  return {
    title,
    totalAmount,
    totalPayout,
    rows: rows.map((item) => ({
      ...item,
      ratio: totalAmount > 0 ? (item.amount / totalAmount) * 100 : 0
    }))
  }
}

const zodiacDistribution = computed(() => {
  const map = new Map()
  for (const item of store.mockData) {
    const zodiac = getZodiacForNumber(item.number) || '--'
    map.set(zodiac, (map.get(zodiac) || 0) + item.amount)
  }
  return [...map.entries()]
    .map(([label, amount]) => ({ label, amount, payout: amount * 47 }))
    .sort((a, b) => b.amount - a.amount)
})

const analysisGroups = computed(() => [
  buildBreakdown('大小分析', [
    { label: '大', amount: sumByNumbers(filterMap.big || []), payout: sumPayoutByNumbers(filterMap.big || []) },
    { label: '小', amount: sumByNumbers(filterMap.small || []), payout: sumPayoutByNumbers(filterMap.small || []) }
  ]),
  buildBreakdown('单双分析', [
    { label: '单', amount: sumByNumbers(filterMap.odd || []), payout: sumPayoutByNumbers(filterMap.odd || []) },
    { label: '双', amount: sumByNumbers(filterMap.even || []), payout: sumPayoutByNumbers(filterMap.even || []) }
  ]),
  buildBreakdown('尾数大小分析', [
    { label: '尾大', amount: sumByNumbers(filterMap.tailBig || []), payout: sumPayoutByNumbers(filterMap.tailBig || []) },
    { label: '尾小', amount: sumByNumbers(filterMap.tailSmall || []), payout: sumPayoutByNumbers(filterMap.tailSmall || []) }
  ]),
  buildBreakdown('家野分析', [
    { label: '野兽', amount: sumByNumbers(filterMap.wild || []), payout: sumPayoutByNumbers(filterMap.wild || []) },
    { label: '家畜', amount: sumByNumbers(filterMap.domestic || []), payout: sumPayoutByNumbers(filterMap.domestic || []) }
  ]),
  buildBreakdown('波色分析', [
    { label: '红波', amount: sumByNumbers(filterMap.red || []), payout: sumPayoutByNumbers(filterMap.red || []) },
    { label: '蓝波', amount: sumByNumbers(filterMap.blue || []), payout: sumPayoutByNumbers(filterMap.blue || []) },
    { label: '绿波', amount: sumByNumbers(filterMap.green || []), payout: sumPayoutByNumbers(filterMap.green || []) }
  ]),
  buildBreakdown('五行分析', [
    { label: '金', amount: sumByNumbers(filterMap.gold || []), payout: sumPayoutByNumbers(filterMap.gold || []) },
    { label: '木', amount: sumByNumbers(filterMap.wood || []), payout: sumPayoutByNumbers(filterMap.wood || []) },
    { label: '水', amount: sumByNumbers(filterMap.water || []), payout: sumPayoutByNumbers(filterMap.water || []) },
    { label: '火', amount: sumByNumbers(filterMap.fire || []), payout: sumPayoutByNumbers(filterMap.fire || []) },
    { label: '土', amount: sumByNumbers(filterMap.earth || []), payout: sumPayoutByNumbers(filterMap.earth || []) }
  ]),
  buildBreakdown('生肖分析', zodiacDistribution.value)
])

onMounted(() => {
  store.updateMockDataWithBets()
})
</script>

<template>
  <div class="view-stack">
    <PageHeader title="风险分析" subtitle="聚焦高赔付号码，快速识别风险集中区域" />

    <section class="stats-grid">
      <StatCard label="总投注额" :value="`¥${totalAmount.toFixed(2)}`" note="实时汇总" />
      <StatCard label="订单数" :value="totalOrders" note="当期订单总数" />
      <article class="stat-card max-risk-card">
        <p class="stat-label">最大赔付号码</p>
        <div class="stat-max-risk">
          <NumberChip v-if="hasMaxRisk" :number="maxRiskItem.number" size="sm" show-zodiac />
          <span v-else class="stat-max-risk-empty"></span>
        </div>
        <p class="stat-note">{{ hasMaxRisk ? `赔付 ¥${maxRiskItem.payout.toFixed(2)}` : '' }}</p>
      </article>
      <StatCard
        label="预期盈亏"
        :value="`¥${expectedProfit.toFixed(2)}`"
        :tone="expectedProfit >= 0 ? 'positive' : 'danger'"
      />
    </section>

    <AppCard title="风险分布">
      <template #actions>
        <select v-model="riskSort" class="sort-select">
          <option value="amount">金额排序</option>
          <option value="number">号码排序</option>
        </select>
      </template>

      <div class="risk-badges">
        <span class="badge high">高风险 {{ riskDistribution.high }}</span>
        <span class="badge medium">中风险 {{ riskDistribution.medium }}</span>
        <span class="badge low">低风险 {{ riskDistribution.low }}</span>
        <span class="badge none">无投注 {{ riskDistribution.none }}</span>
      </div>

      <div class="bar-list" v-if="riskRows.length">
        <article v-for="item in riskRows.slice(0, 20)" :key="item.number" class="bar-item">
          <div class="bar-head">
            <NumberChip :number="item.number" size="sm" />
            <span>¥{{ item.amount.toFixed(2) }}</span>
          </div>
          <div class="bar-track">
            <span class="bar-fill" :style="{ width: `${(item.amount / maxAmount) * 100}%` }"></span>
          </div>
        </article>
      </div>

      <h3 v-if="histogramRows.length" class="risk-extra-title">号码柱状图</h3>
      <div v-if="histogramRows.length" class="number-histogram">
        <article v-for="item in histogramRows" :key="`hist-${item.number}`" class="hist-col">
          <div class="hist-track">
            <span class="hist-fill" :style="{ height: `${(item.amount / maxAmount) * 100}%` }"></span>
          </div>
          <p class="hist-amount">¥{{ item.amount.toFixed(2) }}</p>
          <NumberChip :number="item.number" size="sm" show-zodiac />
        </article>
      </div>
      <p v-else class="empty-tip">暂无投注数据</p>
    </AppCard>

    <AppCard title="多维占比分析" subtitle="按投注金额占比展示，并显示投注额与赔付额">
      <div class="analysis-grid">
        <article v-for="group in analysisGroups" :key="group.title" class="analysis-card">
          <div class="analysis-head">
            <h3>{{ group.title }}</h3>
            <span>投 ¥{{ group.totalAmount.toFixed(2) }} / 赔 ¥{{ group.totalPayout.toFixed(2) }}</span>
          </div>

          <div class="ratio-list">
            <div v-for="row in group.rows" :key="`${group.title}-${row.label}`" class="ratio-item">
              <div class="ratio-meta">
                <span>{{ row.label }}</span>
                <span>{{ row.ratio.toFixed(1) }}%</span>
              </div>
              <div class="ratio-track">
                <span class="ratio-fill" :style="{ width: `${row.ratio}%` }"></span>
              </div>
              <p class="ratio-amount">投 ¥{{ row.amount.toFixed(2) }} / 赔 ¥{{ row.payout.toFixed(2) }}</p>
            </div>
          </div>
        </article>
      </div>
    </AppCard>

    <AppCard title="高风险号码明细" subtitle="按当前排序规则展示">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>号码</th>
              <th>投注金额</th>
              <th>订单数</th>
              <th>潜在赔付</th>
              <th>风险等级</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in riskRows" :key="item.number">
              <td><NumberChip :number="item.number" size="sm" /></td>
              <td>¥{{ item.amount.toFixed(2) }}</td>
              <td>{{ item.bets }}</td>
              <td>¥{{ item.payout.toFixed(2) }}</td>
              <td><span class="badge" :class="item.riskLevel">{{ item.riskLevel }}</span></td>
            </tr>
            <tr v-if="riskRows.length === 0">
              <td colspan="5" class="empty-row">暂无明细</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppCard>
  </div>
</template>
