<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '../stores/app'
import { parseNumberInput } from '../utils/common'
import PageHeader from '../components/PageHeader.vue'
import AppCard from '../components/AppCard.vue'
import NumberChip from '../components/NumberChip.vue'
import OrderTable from '../components/OrderTable.vue'

const store = useAppStore()

const playerName = ref('')
const betAmount = ref(1)
const betType = ref('特码直投')
const numberInput = ref('')

const selectedCount = computed(() => store.pickerState.selectedNumbers.size)
const selectedNumbers = computed(() => [...store.pickerState.selectedNumbers].sort((a, b) => a - b))
const totalBetAmount = computed(() => Number((selectedCount.value * (Number(betAmount.value) || 0)).toFixed(2)))
const totalRecordAmount = computed(() =>
  store.bettingRecords.reduce((sum, record) => sum + (record.totalAmount || 0), 0)
)

const fastFilters = [
  { key: 'big', category: 'size', label: '大' },
  { key: 'small', category: 'size', label: '小' },
  { key: 'odd', category: 'parity', label: '单' },
  { key: 'even', category: 'parity', label: '双' },
  { key: 'red', category: 'wave', label: '红波' },
  { key: 'blue', category: 'wave', label: '蓝波' },
  { key: 'green', category: 'wave', label: '绿波' },
  { key: 'tailBig', category: 'tailSize', label: '尾大' },
  { key: 'tailSmall', category: 'tailSize', label: '尾小' }
]

const isFilterActive = (filterKey, category) => {
  const filters = store.pickerState.activeFilters.get(category)
  return Boolean(filters && filters.has(filterKey))
}

const toggleNumber = (number) => {
  store.togglePickerNumber(number)
}

const toggleFilter = (filterKey, category) => {
  store.toggleFilter(filterKey, category)
}

const addInputNumbers = () => {
  if (!numberInput.value.trim()) return
  const parsed = parseNumberInput(numberInput.value)
  if (parsed.length === 0) return
  store.addInputNumbers(numberInput.value)
  numberInput.value = ''
}

const clearSelection = () => {
  store.resetPickerState()
}

const submitBet = async () => {
  if (selectedCount.value === 0) {
    alert('请先选择号码')
    return
  }

  if (!betAmount.value || Number(betAmount.value) <= 0) {
    alert('请输入有效的下注金额')
    return
  }

  const payload = {
    period: store.currentPeriod,
    playerName: playerName.value || `玩家${Math.floor(Math.random() * 1000)}`,
    betType: betType.value,
    betNumbers: selectedNumbers.value,
    betAmountPerNumber: Number(betAmount.value),
    totalAmount: totalBetAmount.value
  }

  const success = await store.submitBet(payload)
  if (!success) {
    alert('提交失败，请稍后重试')
    return
  }

  store.resetPickerState()
  playerName.value = ''
}

const removeBet = (orderId) => {
  if (!confirm('确认删除该条记录吗？')) return
  store.deleteBet(orderId)
}
</script>

<template>
  <div class="view-stack">
    <PageHeader title="投注管理" subtitle="快速选号、录单与当期订单管理" />

    <AppCard title="快速下注" subtitle="支持筛选、批量输入和手动点选">
      <div class="form-grid">
        <label class="field">
          <span>玩法</span>
          <select v-model="betType">
            <option value="特码直投">特码直投</option>
          </select>
        </label>

        <label class="field">
          <span>玩家 ID</span>
          <input v-model="playerName" type="text" placeholder="可选" />
        </label>

        <label class="field">
          <span>每注金额</span>
          <input v-model.number="betAmount" type="number" min="0.01" step="0.01" />
        </label>

        <div class="field field-readonly">
          <span>选中数量</span>
          <strong>{{ selectedCount }} 注</strong>
        </div>

        <div class="field field-readonly">
          <span>投注总额</span>
          <strong>¥{{ totalBetAmount.toFixed(2) }}</strong>
        </div>

        <button class="btn-primary" @click="submitBet">提交投注</button>
      </div>

      <div class="selection-preview">
        <p>已选号码</p>
        <div class="chip-list">
          <template v-if="selectedNumbers.length">
            <NumberChip v-for="num in selectedNumbers" :key="num" :number="num" size="sm" />
          </template>
          <span v-else class="empty-tip">暂未选择号码</span>
        </div>
      </div>
    </AppCard>

    <AppCard title="选号面板">
      <template #actions>
        <div class="inline-actions">
          <button class="btn-ghost" @click="store.selectAll">全选</button>
          <button class="btn-ghost" @click="store.invertSelection">反选</button>
          <button class="btn-ghost" @click="clearSelection">清空</button>
        </div>
      </template>

      <div class="input-inline">
        <input
          v-model="numberInput"
          type="text"
          placeholder="输入号码、范围（如 1-10）或关键词（如 红波）"
          @keyup.enter="addInputNumbers"
        />
        <button class="btn-ghost" @click="addInputNumbers">添加</button>
      </div>

      <div class="filter-row">
        <button
          v-for="item in fastFilters"
          :key="item.key"
          class="filter-btn"
          :class="{ active: isFilterActive(item.key, item.category) }"
          @click="toggleFilter(item.key, item.category)"
        >
          {{ item.label }}
        </button>
      </div>

      <div class="number-grid">
        <button
          v-for="num in 49"
          :key="num"
          class="number-cell"
          :class="{ active: store.pickerState.selectedNumbers.has(num) }"
          @click="toggleNumber(num)"
        >
          <NumberChip
            :number="num"
            size="md"
            show-zodiac
            :selected="store.pickerState.selectedNumbers.has(num)"
          />
        </button>
      </div>
    </AppCard>

    <AppCard title="当期订单" :subtitle="`共 ${store.bettingRecords.length} 笔，投注 ¥${totalRecordAmount.toFixed(2)}`">
      <OrderTable
        :rows="store.bettingRecords"
        :settled="false"
        show-action
        empty-text="暂无投注记录"
        @remove="removeBet"
      />
    </AppCard>
  </div>
</template>
