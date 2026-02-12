<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useAppStore } from '../stores/app'
import { API } from '../api'
import { formatPeriodDisplay } from '../utils/common'
import PageHeader from '../components/PageHeader.vue'
import AppCard from '../components/AppCard.vue'
import StatCard from '../components/StatCard.vue'
import NumberChip from '../components/NumberChip.vue'
import OrderTable from '../components/OrderTable.vue'

const store = useAppStore()
const BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000
const DRAW_FETCH_INTERVAL_MS = 10000

const selectedPeriod = ref(store.currentPeriod)
const queryText = ref('')
const listTab = ref('all')
const nowMs = ref(Date.now())
const autoSettling = ref(false)
const latestDraw = ref(null)
const lastDrawFetchAt = ref(0)
let timer = null

const isCurrentPeriod = computed(() => selectedPeriod.value === store.currentPeriod)
const currentPeriodSettled = computed(() =>
  store.drawHistory.some((item) => item.period === store.currentPeriod)
)
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

const normalizePeriod = (value) => {
  const digits = String(value || '').replace(/\D/g, '')
  if (!digits) return ''
  return digits.length >= 7 ? digits.slice(0, 7) : digits
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
      <div class="form-grid settlement">
        <div class="settlement-compact-row full-row">
          <label class="field">
            <span>期数</span>
            <select v-model="selectedPeriod">
              <option :value="store.currentPeriod">{{ formatPeriodDisplay(store.currentPeriod) }} (当前)</option>
              <option v-for="item in store.drawHistory" :key="item.period" :value="item.period">
                {{ formatPeriodDisplay(item.period) }}
              </option>
            </select>
          </label>

          <div class="draw-display-panel">
            <span class="draw-display-title">{{ isSettled ? '开奖号码' : '开奖倒计时' }}</span>
            <div v-if="displayedDrawNumbers.length" class="chip-list draw-chip-list">
              <NumberChip
                v-for="(num, idx) in displayedDrawNumbers"
                :key="`${num}-${idx}`"
                :number="num"
                size="lg"
              />
            </div>
            <strong v-else class="draw-countdown">{{ countdownText }}</strong>
          </div>
        </div>
      </div>
    </AppCard>

    <section class="stats-grid">
      <StatCard label="订单数" :value="summary.count" />
      <StatCard label="投注总额" :value="`¥${summary.bet.toFixed(2)}`" />
      <StatCard label="赔付额" :value="isSettled ? `¥${summary.payout.toFixed(2)}` : '---'" tone="warn" />
      <StatCard label="盈亏额" :value="isSettled ? `¥${summary.profit.toFixed(2)}` : '---'" :tone="summary.profit >= 0 ? 'positive' : 'danger'" />
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
