<script setup>
import { computed, ref } from 'vue'
import NumberChip from './NumberChip.vue'

const props = defineProps({
  rows: { type: Array, default: () => [] },
  settled: { type: Boolean, default: false },
  showAction: { type: Boolean, default: false },
  emptyText: { type: String, default: '暂无数据' }
})

const emit = defineEmits(['remove', 'update-player'])

const detailOrder = ref(null)
const selectedPlayerName = ref('')

const formatCurrency = (value) => {
  const amount = Number(value)
  return Number.isFinite(amount) ? `￥${amount.toFixed(2)}` : '---'
}

const displayPayout = (row) => {
  if (!props.settled) return '---'
  const payout = Number(row.payout || 0)
  if (payout > 0) return `中奖￥${payout.toFixed(2)}`
  return '未中奖￥0.00'
}

const displayProfit = (row) => {
  if (!props.settled) return '---'
  return formatCurrency(row.profit || 0)
}

const profitClass = (row) => {
  if (!props.settled) return ''
  return (row.profit || 0) >= 0 ? 'profit' : 'loss'
}

const modalTitle = computed(() => {
  if (!detailOrder.value) return ''
  return `${detailOrder.value.orderId || '--'} 详情`
})

const openDetail = (row) => {
  detailOrder.value = row
  selectedPlayerName.value = row?.playerName || ''
}

const closeDetail = () => {
  detailOrder.value = null
}

const onRemove = (orderId) => {
  emit('remove', orderId)
}

const playerOptions = computed(() => {
  const map = new Map()
  for (const row of props.rows || []) {
    const name = String(row?.playerName || '').trim()
    if (!name) continue
    if (!map.has(name)) map.set(name, name)
  }
  return [...map.values()]
})

const confirmUpdatePlayer = () => {
  if (!detailOrder.value) return
  const nextName = String(selectedPlayerName.value || '').trim()
  const currentName = String(detailOrder.value.playerName || '').trim()
  if (!nextName || nextName === currentName) return

  if (!confirm(`确认将玩家从“${currentName || '--'}”修改为“${nextName}”吗？`)) return

  emit('update-player', {
    orderId: detailOrder.value.orderId,
    id: detailOrder.value.id,
    playerName: nextName
  })

  detailOrder.value = { ...detailOrder.value, playerName: nextName }
}

const isWinningNumber = (row, number) => {
  if (!props.settled || !row) return false
  const wins = Array.isArray(row.winNumbers) ? row.winNumbers : []
  return wins.includes(Number(number))
}
</script>

<template>
  <div class="table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>订单号</th>
          <th>玩家</th>
          <th>玩法</th>
          <th>内容</th>
          <th>单注</th>
          <th>投注额</th>
          <th>赔付</th>
          <th>盈亏额</th>
          <th v-if="showAction">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.orderId" class="order-row" @click="openDetail(row)">
          <td>{{ row.orderId }}</td>
          <td>{{ row.playerName || '--' }}</td>
          <td>{{ row.betType || '--' }}</td>
          <td>
            <div class="chip-list compact">
              <NumberChip
                v-for="number in (row.betNumbers || []).slice(0, 6)"
                :key="`${row.orderId}-${number}`"
                :number="number"
                size="sm"
              />
              <span v-if="(row.betNumbers || []).length > 6" class="more-chip">+{{ row.betNumbers.length - 6 }}</span>
            </div>
          </td>
          <td>{{ formatCurrency(row.betAmountPerNumber || 0) }}</td>
          <td>{{ formatCurrency(row.totalAmount || 0) }}</td>
          <td>{{ displayPayout(row) }}</td>
          <td :class="profitClass(row)">{{ displayProfit(row) }}</td>
          <td v-if="showAction">
            <button class="btn-danger" @click.stop="onRemove(row.orderId)">删除</button>
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td :colspan="showAction ? 9 : 8" class="empty-row">{{ emptyText }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="detailOrder" class="order-detail-mask" @click="closeDetail">
    <div class="order-detail-panel" @click.stop>
      <div class="order-detail-head">
        <h3>{{ modalTitle }}</h3>
        <button class="btn-ghost" @click="closeDetail">关闭</button>
      </div>

      <div class="order-detail-grid">
        <p><span>订单号</span><strong>{{ detailOrder.orderId || '--' }}</strong></p>
        <p>
          <span>玩家</span>
          <span class="detail-player-edit">
            <select v-model="selectedPlayerName">
              <option v-if="detailOrder.playerName && !playerOptions.includes(detailOrder.playerName)" :value="detailOrder.playerName">
                {{ detailOrder.playerName }}
              </option>
              <option v-for="name in playerOptions" :key="name" :value="name">{{ name }}</option>
            </select>
            <button class="btn-ghost detail-player-btn" @click="confirmUpdatePlayer">修改</button>
          </span>
        </p>
        <p><span>玩法</span><strong>{{ detailOrder.betType || '--' }}</strong></p>
        <p><span>单注</span><strong>{{ formatCurrency(detailOrder.betAmountPerNumber || 0) }}</strong></p>
        <p><span>投注额</span><strong>{{ formatCurrency(detailOrder.totalAmount || 0) }}</strong></p>
        <p><span>赔付</span><strong>{{ displayPayout(detailOrder) }}</strong></p>
        <p><span>盈亏额</span><strong :class="profitClass(detailOrder)">{{ displayProfit(detailOrder) }}</strong></p>
        <p><span>时间</span><strong>{{ detailOrder.timestamp || detailOrder.drawTime || '--' }}</strong></p>
      </div>

      <div class="order-detail-numbers">
        <p>投注号码</p>
        <div class="chip-list">
          <span
            v-for="(num, idx) in detailOrder.betNumbers || []"
            :key="`detail-${detailOrder.orderId}-${num}-${idx}`"
            class="detail-chip-wrap"
          >
            <NumberChip
              :number="num"
              size="sm"
              :selected="isWinningNumber(detailOrder, num)"
            />
            <em v-if="isWinningNumber(detailOrder, num)" class="detail-win-tag">中</em>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

