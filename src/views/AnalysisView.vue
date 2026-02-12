<script setup>
import { computed, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import { getNumberWaveColor } from '../utils/common'
import PageHeader from '../components/PageHeader.vue'
import AppCard from '../components/AppCard.vue'
import StatCard from '../components/StatCard.vue'
import NumberChip from '../components/NumberChip.vue'

const store = useAppStore()

const totalAmount = computed(() => store.mockData.reduce((sum, item) => sum + item.amount, 0))
const totalBets = computed(() => store.mockData.reduce((sum, item) => sum + item.bets, 0))
const maxRiskItem = computed(() => store.mockData.reduce((max, item) => (item.payout > max.payout ? item : max), store.mockData[0]))
const expectedProfit = computed(() => totalAmount.value - store.mockData.reduce((sum, item) => sum + item.payout, 0) / 49)

const riskRows = computed(() =>
  [...store.mockData]
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.payout - a.payout)
)

const riskDistribution = computed(() => {
  const base = { high: 0, medium: 0, low: 0, none: 0 }
  for (const item of store.mockData) base[item.riskLevel] += 1
  return base
})

const waveDistribution = computed(() => {
  const acc = { red: 0, blue: 0, green: 0 }
  for (const item of store.mockData) {
    const wave = getNumberWaveColor(item.number)
    if (acc[wave] !== undefined) acc[wave] += item.amount
  }
  return [
    { key: 'red', label: '红波', amount: acc.red },
    { key: 'blue', label: '蓝波', amount: acc.blue },
    { key: 'green', label: '绿波', amount: acc.green }
  ]
})

const maxAmount = computed(() => Math.max(...riskRows.value.map((item) => item.amount), 1))

onMounted(() => {
  store.updateMockDataWithBets()
})
</script>

<template>
  <div class="view-stack">
    <PageHeader title="风险分析" subtitle="聚焦高赔付号码，快速识别风险集中区域" />

    <section class="stats-grid">
      <StatCard label="总投注额" :value="`¥${totalAmount.toFixed(2)}`" note="实时汇总" />
      <StatCard label="投注笔数" :value="totalBets" note="累计订单投注次数" />
      <StatCard
        label="最大赔付号码"
        :value="maxRiskItem ? `#${String(maxRiskItem.number).padStart(2, '0')}` : '--'"
        :note="maxRiskItem ? `赔付 ¥${maxRiskItem.payout.toFixed(2)}` : ''"
        tone="warn"
      />
      <StatCard
        label="预期盈亏"
        :value="`¥${expectedProfit.toFixed(2)}`"
        :tone="expectedProfit >= 0 ? 'positive' : 'danger'"
      />
    </section>

    <AppCard title="风险分布">
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
      <p v-else class="empty-tip">暂无投注数据</p>
    </AppCard>

    <AppCard title="波色投注分布">
      <div class="wave-grid">
        <article v-for="wave in waveDistribution" :key="wave.key" class="wave-card">
          <h3>{{ wave.label }}</h3>
          <p>¥{{ wave.amount.toFixed(2) }}</p>
        </article>
      </div>
    </AppCard>

    <AppCard title="高风险号码明细" subtitle="按潜在赔付从高到低排序">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>号码</th>
              <th>投注金额</th>
              <th>投注笔数</th>
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
