<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '../stores/app'
import { parseNumberInput, showToast } from '../utils/common'
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

const filterGroups = [
  {
    title: '两面',
    items: [
      { key: 'big', category: 'size', label: '大' },
      { key: 'small', category: 'size', label: '小' },
      { key: 'odd', category: 'parity', label: '单' },
      { key: 'even', category: 'parity', label: '双' },
      { key: 'tailBig', category: 'tailSize', label: '尾大' },
      { key: 'tailSmall', category: 'tailSize', label: '尾小' },
      { key: 'wild', category: 'beast', label: '野兽' },
      { key: 'domestic', category: 'beast', label: '家兽' }
    ]
  },
  {
    title: '波色',
    items: [
      { key: 'red', category: 'wave', label: '红波' },
      { key: 'blue', category: 'wave', label: '蓝波' },
      { key: 'green', category: 'wave', label: '绿波' }
    ]
  },
  {
    title: '五行',
    items: [
      { key: 'gold', category: 'element', label: '金' },
      { key: 'wood', category: 'element', label: '木' },
      { key: 'water', category: 'element', label: '水' },
      { key: 'fire', category: 'element', label: '火' },
      { key: 'earth', category: 'element', label: '土' }
    ]
  },
  {
    title: '头部',
    items: [
      { key: 'head0', category: 'head', label: '0头' },
      { key: 'head1', category: 'head', label: '1头' },
      { key: 'head2', category: 'head', label: '2头' },
      { key: 'head3', category: 'head', label: '3头' },
      { key: 'head4', category: 'head', label: '4头' }
    ]
  },
  {
    title: '尾数',
    items: [
      { key: 'tail0', category: 'tail', label: '0尾' },
      { key: 'tail1', category: 'tail', label: '1尾' },
      { key: 'tail2', category: 'tail', label: '2尾' },
      { key: 'tail3', category: 'tail', label: '3尾' },
      { key: 'tail4', category: 'tail', label: '4尾' },
      { key: 'tail5', category: 'tail', label: '5尾' },
      { key: 'tail6', category: 'tail', label: '6尾' },
      { key: 'tail7', category: 'tail', label: '7尾' },
      { key: 'tail8', category: 'tail', label: '8尾' },
      { key: 'tail9', category: 'tail', label: '9尾' }
    ]
  },
  {
    title: '生肖',
    items: [
      { key: '鼠', category: 'zodiac', label: '鼠' },
      { key: '牛', category: 'zodiac', label: '牛' },
      { key: '虎', category: 'zodiac', label: '虎' },
      { key: '兔', category: 'zodiac', label: '兔' },
      { key: '龙', category: 'zodiac', label: '龙' },
      { key: '蛇', category: 'zodiac', label: '蛇' },
      { key: '马', category: 'zodiac', label: '马' },
      { key: '羊', category: 'zodiac', label: '羊' },
      { key: '猴', category: 'zodiac', label: '猴' },
      { key: '鸡', category: 'zodiac', label: '鸡' },
      { key: '狗', category: 'zodiac', label: '狗' },
      { key: '猪', category: 'zodiac', label: '猪' }
    ]
  }
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

  showToast('投注成功', 'success')
  store.resetPickerState()
  playerName.value = ''
}

const removeBet = (orderId) => {
  if (!confirm('确认删除该条记录吗？')) return
  store.deleteBet(orderId)
}

const updateOrderPlayer = async (payload) => {
  const success = await store.updateOrderPlayer(payload)
  showToast(success ? '玩家已更新' : '玩家更新失败', success ? 'success' : 'error')
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

        <div class="field">
          <span>选中数量</span>
          <div class="field-value">{{ selectedCount }} 注</div>
        </div>

        <div class="field">
          <span>投注总额</span>
          <div class="field-value">¥{{ totalBetAmount.toFixed(2) }}</div>
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

      <div class="number-grid picker-number-grid">
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

      <div class="input-inline">
        <input
          v-model="numberInput"
          type="text"
          placeholder="输入号码、范围（如 1-10）或关键词（如 红波）"
          @keyup.enter="addInputNumbers"
        />
        <button class="btn-ghost" @click="addInputNumbers">添加</button>
      </div>

      <div class="filter-groups">
        <div v-for="group in filterGroups" :key="group.title" class="filter-group">
          <p class="filter-group-title">{{ group.title }}</p>
          <div class="filter-row">
            <button
              v-for="item in group.items"
              :key="item.key"
              class="filter-btn"
              :class="{ active: isFilterActive(item.key, item.category) }"
              @click="toggleFilter(item.key, item.category)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </div>

    </AppCard>

    <AppCard title="当期订单" :subtitle="`共 ${store.bettingRecords.length} 笔，投注 ¥${totalRecordAmount.toFixed(2)}`">
      <OrderTable
        :rows="store.bettingRecords"
        :settled="false"
        show-action
        empty-text="暂无投注记录"
        @remove="removeBet"
        @update-player="updateOrderPlayer"
      />
    </AppCard>
  </div>
</template>
