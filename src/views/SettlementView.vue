<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '../stores/app'
import { formatPeriodDisplay } from '../utils/common'
import PageHeader from '../components/PageHeader.vue'
import AppCard from '../components/AppCard.vue'
import StatCard from '../components/StatCard.vue'
import NumberChip from '../components/NumberChip.vue'
import OrderTable from '../components/OrderTable.vue'

const store = useAppStore()

const selectedPeriod = ref(store.currentPeriod)
const drawInputs = ref(['', '', '', '', '', '', ''])
const queryText = ref('')
const listTab = ref('all')

const isCurrentPeriod = computed(() => selectedPeriod.value === store.currentPeriod)
const historyRecord = computed(() => store.drawHistory.find((item) => item.period === selectedPeriod.value))
const isSettled = computed(() => Boolean(historyRecord.value))

const visibleBets = computed(() => {
  if (isSettled.value) return historyRecord.value.bets || []
  if (isCurrentPeriod.value) return store.bettingRecords
  return []
})

const searchedBets = computed(() => {
  let rows = [...visibleBets.value]

  if (queryText.value.trim()) {
    const keyword = queryText.value.trim().toLowerCase()
    rows = rows.filter(
      (item) =>
        (item.orderId && item.orderId.toLowerCase().includes(keyword)) ||
        (item.playerName && item.playerName.toLowerCase().includes(keyword))
    )
  }

  return rows
})

const tabCounts = computed(() => ({
  all: searchedBets.value.length,
  win: searchedBets.value.filter((item) => (item.payout || 0) > 0).length,
  lose: searchedBets.value.filter((item) => (item.payout || 0) === 0).length
}))

const filteredBets = computed(() => {
  let rows = [...searchedBets.value]

  if (listTab.value === 'win') rows = rows.filter((item) => (item.payout || 0) > 0)
  if (listTab.value === 'lose') rows = rows.filter((item) => (item.payout || 0) === 0)

  return rows
})

const summary = computed(() => {
  const rows = filteredBets.value
  const totalBet = rows.reduce((sum, item) => sum + (item.totalAmount || 0), 0)
  const totalPayout = rows.reduce((sum, item) => sum + (item.payout || 0), 0)
  return {
    count: rows.length,
    bet: totalBet,
    payout: totalPayout,
    profit: totalBet - totalPayout,
    wins: rows.filter((item) => (item.payout || 0) > 0).length
  }
})

const displayedDrawNumbers = computed(() => {
  if (historyRecord.value?.drawNumbers?.length) return historyRecord.value.drawNumbers
  return []
})

const settleCurrentPeriod = async () => {
  if (!isCurrentPeriod.value) return

  const drawNumbers = drawInputs.value
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value >= 1 && value <= 49)

  if (drawNumbers.length !== 7) {
    alert('请输入 7 个有效号码（1-49）')
    return
  }

  const uniqueCount = new Set(drawNumbers).size
  if (uniqueCount !== 7) {
    alert('号码不能重复')
    return
  }

  await store.settleCurrentPeriod(drawNumbers)
}

const clearHistory = () => {
  if (!confirm('确认清空历史记录吗？')) return
  store.drawHistory = []
}
</script>

<template>
  <div class="view-stack">
    <PageHeader title="开奖结算" subtitle="录入开奖号码，完成当期输赢结算">
      <template #actions>
        <button class="btn-danger" @click="clearHistory">清空历史</button>
      </template>
    </PageHeader>

    <AppCard title="期数与开奖号码">
      <div class="form-grid settlement">
        <label class="field">
          <span>期数</span>
          <select v-model="selectedPeriod">
            <option :value="store.currentPeriod">{{ formatPeriodDisplay(store.currentPeriod) }} (当前)</option>
            <option v-for="item in store.drawHistory" :key="item.period" :value="item.period">
              {{ formatPeriodDisplay(item.period) }}
            </option>
          </select>
        </label>

        <div class="field field-readonly full-row">
          <span>开奖状态</span>
          <strong>{{ isSettled ? '已开奖' : isCurrentPeriod ? '待开奖' : '未开奖' }}</strong>
        </div>

        <div class="draw-row full-row" v-if="isCurrentPeriod && !isSettled">
          <input
            v-for="(_, index) in drawInputs"
            :key="index"
            v-model="drawInputs[index]"
            type="number"
            min="1"
            max="49"
            placeholder="--"
          />
          <button class="btn-primary" @click="settleCurrentPeriod">执行结算</button>
        </div>

        <div class="chip-list full-row" v-else-if="displayedDrawNumbers.length">
          <NumberChip
            v-for="(num, idx) in displayedDrawNumbers"
            :key="`${num}-${idx}`"
            :number="num"
            size="lg"
          />
        </div>
      </div>
    </AppCard>

    <section class="stats-grid">
      <StatCard label="订单数" :value="summary.count" />
      <StatCard label="投注总额" :value="`¥${summary.bet.toFixed(2)}`" />
      <StatCard label="赔付总额" :value="`¥${summary.payout.toFixed(2)}`" tone="warn" />
      <StatCard label="盈亏" :value="`¥${summary.profit.toFixed(2)}`" :tone="summary.profit >= 0 ? 'positive' : 'danger'" />
    </section>

    <AppCard title="订单列表" subtitle="支持按玩家/订单号搜索">
      <template #actions>
        <div class="inline-actions">
          <button class="btn-ghost" :class="{ active: listTab === 'all' }" @click="listTab = 'all'">全部 {{ tabCounts.all }}</button>
          <button class="btn-ghost" :class="{ active: listTab === 'win' }" @click="listTab = 'win'">中奖 {{ tabCounts.win }}</button>
          <button class="btn-ghost" :class="{ active: listTab === 'lose' }" @click="listTab = 'lose'">未中奖 {{ tabCounts.lose }}</button>
        </div>
      </template>

      <div class="input-inline">
        <input v-model="queryText" type="text" placeholder="搜索订单号或玩家" />
      </div>

      <OrderTable
        :rows="filteredBets"
        :settled="isSettled"
        empty-text="暂无数据"
      />
    </AppCard>
  </div>
</template>
