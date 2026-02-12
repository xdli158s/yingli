<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useAppStore } from '../stores/app'
import { API } from '../api'
import { formatPeriodDisplay, normalizePeriod, showToast } from '../utils/common'
import PageHeader from '../components/PageHeader.vue'
import AppCard from '../components/AppCard.vue'
import StatCard from '../components/StatCard.vue'
import NumberChip from '../components/NumberChip.vue'
import OrderTable from '../components/OrderTable.vue'

const store = useAppStore()
const BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000
const DRAW_FETCH_INTERVAL_MS = 10000
const HISTORY_OVERVIEW_KEY = '__history_overview__'

const selectedPeriod = ref(normalizePeriod(store.currentPeriod) || store.currentPeriod)
const queryText = ref('')
const listTab = ref('all')
const nowMs = ref(Date.now())
const autoSettling = ref(false)
const latestDraw = ref(null)
const lastDrawFetchAt = ref(0)
let timer = null

const isCurrentPeriod = computed(() =>
  (normalizePeriod(selectedPeriod.value) || selectedPeriod.value) === (normalizePeriod(store.currentPeriod) || store.currentPeriod)
)
const isHistoryOverviewSelected = computed(() => selectedPeriod.value === HISTORY_OVERVIEW_KEY)
const currentPeriodSettled = computed(() => {
  const current = normalizePeriod(store.currentPeriod) || store.currentPeriod
  return store.drawHistory.some((item) => (normalizePeriod(item.period) || item.period) === current)
})
const historyRecord = computed(() => {
  const selected = normalizePeriod(selectedPeriod.value) || selectedPeriod.value
  return store.drawHistory.find((item) => (normalizePeriod(item.period) || item.period) === selected)
})
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

const toSafeNumber = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

const hasFiniteNumber = (value) => Number.isFinite(Number(value))

const deriveStatsFromBets = (bets = []) => {
  const rows = Array.isArray(bets) ? bets : []
  const bet = rows.reduce((sum, item) => sum + toSafeNumber(item.totalAmount), 0)
  const payout = rows.reduce((sum, item) => sum + toSafeNumber(item.payout), 0)
  return {
    count: rows.length,
    bet,
    payout,
    profit: bet - payout
  }
}

const deriveStatsFromHistoryItem = (item) => {
  const bets = Array.isArray(item?.bets) ? item.bets : []
  const countByField = toSafeNumber(item?.totalBets)
  const betByField = toSafeNumber(item?.totalBetAmount)
  const payoutByField = toSafeNumber(item?.totalPayout)
  const profitByField = toSafeNumber(item?.profit)
  const hasCountByField = hasFiniteNumber(item?.totalBets)
  const hasBetByField = hasFiniteNumber(item?.totalBetAmount)
  const hasPayoutByField = hasFiniteNumber(item?.totalPayout)
  const hasProfitByField = hasFiniteNumber(item?.profit)
  const fallback = deriveStatsFromBets(bets)

  return {
    period: item?.period,
    count: hasCountByField ? countByField : fallback.count,
    bet: hasBetByField ? betByField : fallback.bet,
    payout: hasPayoutByField ? payoutByField : fallback.payout,
    profit: (hasBetByField && hasPayoutByField) ? (betByField - payoutByField) : (hasProfitByField ? profitByField : fallback.profit)
  }
}

const summary = computed(() => {
  if (isHistoryOverviewSelected.value) return historyOverviewSummary.value

  if (isSettled.value && historyRecord.value) return deriveStatsFromHistoryItem(historyRecord.value)
  return deriveStatsFromBets(visibleBets.value)
})

const historyPeriodStats = computed(() =>
  store.drawHistory.map((item) => deriveStatsFromHistoryItem(item))
)

const historyOverviewSummary = computed(() => ({
  count: historyPeriodStats.value.reduce((sum, item) => sum + item.count, 0),
  bet: historyPeriodStats.value.reduce((sum, item) => sum + item.bet, 0),
  payout: historyPeriodStats.value.reduce((sum, item) => sum + item.payout, 0),
  profit: historyPeriodStats.value.reduce((sum, item) => sum + item.profit, 0)
}))

const displayedDrawNumbers = computed(() => {
  if (historyRecord.value?.drawNumbers?.length) return historyRecord.value.drawNumbers
  return []
})

const formatCurrency = (value) => `¥${Number(value || 0).toFixed(2)}`

const jumpToPeriod = (period) => {
  if (!period) return
  selectedPeriod.value = period
}

const getBeijingDayParts = (utcMs = Date.now()) => {
  const bjDate = new Date(utcMs + BEIJING_OFFSET_MS)
  return {
    year: bjDate.getUTCFullYear(),
    month: bjDate.getUTCMonth(),
    day: bjDate.getUTCDate()
  }
}

const getTodayDrawWindow = (utcMs = Date.now()) => {
  const { year, month, day } = getBeijingDayParts(utcMs)
  const startUtcMs = Date.UTC(year, month, day, 21, 30, 0, 0) - BEIJING_OFFSET_MS
  const endUtcMs = Date.UTC(year, month, day, 21, 40, 0, 0) - BEIJING_OFFSET_MS
  return { startUtcMs, endUtcMs }
}

const formatCountdown = (ms) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const countdownText = computed(() => {
  if (isSettled.value) return '已开奖'
  if (!isCurrentPeriod.value) return '---'

  const currentUtcMs = nowMs.value
  const { startUtcMs, endUtcMs } = getTodayDrawWindow(currentUtcMs)
  const currentPeriod = normalizePeriod(store.currentPeriod)
  const latestPeriod = normalizePeriod(latestDraw.value?.expect)

  if (latestPeriod && currentPeriod && latestPeriod !== currentPeriod) {
    return `等待本期(${currentPeriod})开奖，接口当前期(${latestPeriod})`
  }

  if (currentUtcMs < startUtcMs) return formatCountdown(startUtcMs - currentUtcMs)
  if (currentUtcMs <= endUtcMs) return '开奖中，等待接口回传...'
  return '等待接口回传开奖号码...'
})

const attachPeriodBets = (period, bets) => {
  store.drawHistory = store.drawHistory.map((item) =>
    item.period === period ? { ...item, bets } : item
  )
}

const enrichSettledBets = (rows, specialNumber) => {
  const special = Number(specialNumber)
  return rows.map((record) => {
    const betNumbers = Array.isArray(record.betNumbers) ? record.betNumbers : []
    const amountPerNumber = Number(record.betAmountPerNumber || 0)
    const winNumbers = Number.isInteger(special)
      ? betNumbers.filter((number) => Number(number) === special)
      : []
    const payout = winNumbers.length * amountPerNumber * 47
    return {
      ...record,
      winNumbers,
      hasWin: payout > 0,
      payout,
      odds: 47,
      profit: (record.totalAmount || 0) - payout
    }
  })
}

const loadBetsForSelectedPeriod = async () => {
  if (!isSettled.value || !historyRecord.value) return
  if (Array.isArray(historyRecord.value.bets) && historyRecord.value.bets.length > 0) return

  const rows = await API.getBets(selectedPeriod.value)
  if (!Array.isArray(rows)) return
  const bets = enrichSettledBets(rows, historyRecord.value.specialNumber)
  attachPeriodBets(selectedPeriod.value, bets)
}

const fetchLatestDrawIfNeeded = async (force = false) => {
  const now = Date.now()
  if (!force && now - lastDrawFetchAt.value < DRAW_FETCH_INTERVAL_MS) return
  lastDrawFetchAt.value = now

  const res = await API.getLatestDraw()
  if (!res || typeof res !== 'object') return
  latestDraw.value = res
}

const getApiDrawNumbers = () => {
  const direct = Array.isArray(latestDraw.value?.numbers) ? latestDraw.value.numbers : []
  if (direct.length === 7) return direct

  const parsed = String(latestDraw.value?.openCode || '')
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= 49)

  return parsed.length === 7 ? parsed : []
}

const autoSettleIfNeeded = async () => {
  if (currentPeriodSettled.value || autoSettling.value) return

  const currentUtcMs = nowMs.value
  const { startUtcMs } = getTodayDrawWindow(currentUtcMs)
  if (currentUtcMs < startUtcMs) return

  await fetchLatestDrawIfNeeded()

  const currentPeriod = normalizePeriod(store.currentPeriod)
  const latestPeriod = normalizePeriod(latestDraw.value?.expect)
  if (!currentPeriod || !latestPeriod || currentPeriod !== latestPeriod) return

  const drawNumbers = getApiDrawNumbers()
  if (drawNumbers.length !== 7) return

  autoSettling.value = true
  try {
    await store.settleCurrentPeriod(drawNumbers)
    await loadBetsForSelectedPeriod()
  } finally {
    autoSettling.value = false
  }
}

const updateOrderPlayer = async (payload) => {
  const success = await store.updateOrderPlayer(payload)
  showToast(success ? '玩家已更新' : '玩家更新失败', success ? 'success' : 'error')
}

watch(selectedPeriod, async () => {
  await loadBetsForSelectedPeriod()
})

watch(historyRecord, async () => {
  await loadBetsForSelectedPeriod()
})

onMounted(async () => {
  nowMs.value = Date.now()
  timer = setInterval(async () => {
    nowMs.value = Date.now()
    await autoSettleIfNeeded()
  }, 1000)

  await fetchLatestDrawIfNeeded(true)
  await autoSettleIfNeeded()
  await loadBetsForSelectedPeriod()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="view-stack">
    <PageHeader title="开奖结算" subtitle="北京时间 21:30-21:40 自动开奖，按接口期数一致后结算" />

    <AppCard title="期数与开奖号码">
      <template #actions>
        <label class="settlement-period-picker">
          <span>期数</span>
          <select v-model="selectedPeriod">
            <option :value="HISTORY_OVERVIEW_KEY">历史统计</option>
            <option :value="normalizePeriod(store.currentPeriod) || store.currentPeriod">{{ formatPeriodDisplay(store.currentPeriod) }} (当前)</option>
            <option v-for="item in store.drawHistory" :key="item.period" :value="normalizePeriod(item.period) || item.period">
              {{ formatPeriodDisplay(item.period) }}
            </option>
          </select>
        </label>
      </template>

      <div class="form-grid settlement">
        <div class="draw-display-panel full-row">
          <span class="draw-display-title">{{ isHistoryOverviewSelected ? '历史汇总模式' : (isSettled ? '开奖号码' : '开奖倒计时') }}</span>
          <div v-if="displayedDrawNumbers.length" class="chip-list draw-chip-list">
            <NumberChip
              v-for="(num, idx) in displayedDrawNumbers"
              :key="`${num}-${idx}`"
              :number="num"
              size="lg"
              show-zodiac
            />
          </div>
          <strong v-else class="draw-countdown">{{ isHistoryOverviewSelected ? '请选择下方期数查看详情' : countdownText }}</strong>
        </div>
      </div>
    </AppCard>

    <section class="stats-grid">
      <StatCard label="订单数" :value="summary.count" />
      <StatCard label="投注额" :value="`¥${summary.bet.toFixed(2)}`" />
      <StatCard label="赔付额" :value="(isSettled || isHistoryOverviewSelected) ? `¥${summary.payout.toFixed(2)}` : '---'" tone="warn" />
      <StatCard label="盈亏额" :value="(isSettled || isHistoryOverviewSelected) ? `¥${summary.profit.toFixed(2)}` : '---'" :tone="summary.profit >= 0 ? 'positive' : 'danger'" />
    </section>

    <AppCard v-if="isHistoryOverviewSelected" title="历史统计" subtitle="点击期数可切换到该期结算详情">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>期数</th>
              <th>订单数</th>
              <th>投注额</th>
              <th>赔付</th>
              <th>盈亏</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in historyPeriodStats"
              :key="row.period"
              class="period-row"
              @click="jumpToPeriod(row.period)"
            >
              <td class="period-jump">{{ formatPeriodDisplay(row.period) }}</td>
              <td>{{ row.count }}</td>
              <td>{{ formatCurrency(row.bet) }}</td>
              <td>{{ formatCurrency(row.payout) }}</td>
              <td :class="row.profit >= 0 ? 'profit' : 'loss'">{{ formatCurrency(row.profit) }}</td>
            </tr>
            <tr v-if="historyPeriodStats.length === 0">
              <td colspan="5" class="empty-row">暂无历史数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppCard>

    <AppCard v-else title="订单列表" subtitle="支持按玩家/订单号搜索">
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
        @update-player="updateOrderPlayer"
      />
    </AppCard>
  </div>
</template>
