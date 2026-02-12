import { defineStore } from 'pinia'
import { initNumberStats, calculateCurrentPeriod, generateOrderId, parseNumberInput } from '../utils/common'
import { numberData, filterMap } from '../utils/constants'
import { API } from '../api'

export const useAppStore = defineStore('app', {
  state: () => ({
    pickerState: {
      selectedNumbers: new Set(),
      activeFilters: new Map(),
      customNumbers: new Set()
    },
    bettingRecords: [],
    drawHistory: [],
    mockData: initNumberStats(),
    currentPeriod: calculateCurrentPeriod(),
    globalSortBy: 'number'
  }),

  actions: {
    resetPickerState() {
      this.pickerState.selectedNumbers.clear()
      this.pickerState.activeFilters.clear()
      this.pickerState.customNumbers.clear()
    },

    updateMockDataWithBets() {
      for (const item of this.mockData) {
        item.amount = 0
        item.bets = 0
        item.payout = 0
        item.riskRatio = 0
        item.riskLevel = 'none'
      }

      for (const record of this.bettingRecords) {
        const betNumbers = Array.isArray(record.betNumbers) ? record.betNumbers : []
        const amountPerNumber = Number(record.betAmountPerNumber) || 0

        for (const num of betNumbers) {
          if (!Number.isInteger(num) || num < 1 || num > 49) continue
          const item = this.mockData[num - 1]
          if (!item) continue
          item.amount += amountPerNumber
          item.bets += 1
        }
      }

      for (const item of this.mockData) {
        item.payout = item.amount * 47
        item.riskRatio = item.amount > 0 ? Number(((item.payout / 15680) * 100).toFixed(1)) : 0
        item.riskLevel = item.payout > 15000 ? 'high' : item.payout > 5000 ? 'medium' : item.payout > 0 ? 'low' : 'none'
      }
    },

    setPeriod(period) {
      this.currentPeriod = period
    },

    togglePickerNumber(number) {
      if (this.pickerState.customNumbers.has(number)) {
        this.pickerState.customNumbers.delete(number)
      } else {
        this.pickerState.customNumbers.add(number)
      }
      this.recalculateSelectedNumbers()
    },

    toggleFilter(filterKey, category) {
      if (!this.pickerState.activeFilters.has(category)) {
        this.pickerState.activeFilters.set(category, new Set())
      }

      const filters = this.pickerState.activeFilters.get(category)
      if (filters.has(filterKey)) {
        filters.delete(filterKey)
        if (filters.size === 0) {
          this.pickerState.activeFilters.delete(category)
        }
      } else {
        filters.add(filterKey)
      }

      this.recalculateSelectedNumbers()
    },

    recalculateSelectedNumbers() {
      if (this.pickerState.activeFilters.size === 0 && this.pickerState.customNumbers.size === 0) {
        this.pickerState.selectedNumbers.clear()
        return
      }

      const groupedSelections = []

      for (const [category, filterKeys] of this.pickerState.activeFilters.entries()) {
        if (!filterKeys.size) continue
        const numbersInCategory = new Set()

        for (const filterKey of filterKeys) {
          const numbers = category === 'zodiac' ? numberData.zodiac[filterKey] : filterMap[filterKey]
          if (!Array.isArray(numbers)) continue
          for (const number of numbers) numbersInCategory.add(number)
        }

        if (numbersInCategory.size) groupedSelections.push(numbersInCategory)
      }

      if (this.pickerState.customNumbers.size) {
        groupedSelections.push(new Set(this.pickerState.customNumbers))
      }

      if (!groupedSelections.length) {
        this.pickerState.selectedNumbers.clear()
        return
      }

      let result = new Set(groupedSelections[0])
      for (let i = 1; i < groupedSelections.length; i += 1) {
        result = new Set([...result].filter((number) => groupedSelections[i].has(number)))
      }

      this.pickerState.selectedNumbers = result
    },

    addInputNumbers(input) {
      const numbers = parseNumberInput(input)
      if (numbers.length === 0) return 0

      for (const number of numbers) {
        this.pickerState.customNumbers.add(number)
      }

      this.recalculateSelectedNumbers()
      return numbers.length
    },

    selectAll() {
      this.pickerState.activeFilters.clear()
      this.pickerState.customNumbers.clear()
      for (let i = 1; i <= 49; i += 1) this.pickerState.customNumbers.add(i)
      this.recalculateSelectedNumbers()
    },

    invertSelection() {
      const currentSelection = new Set(this.pickerState.selectedNumbers)
      this.pickerState.activeFilters.clear()
      this.pickerState.customNumbers.clear()

      for (let i = 1; i <= 49; i += 1) {
        if (!currentSelection.has(i)) this.pickerState.customNumbers.add(i)
      }

      this.recalculateSelectedNumbers()
    },

    async hydrateFromServer() {
      try {
        const [history, bets] = await Promise.all([API.getHistory(), API.getBets(this.currentPeriod)])

        if (Array.isArray(history)) {
          this.drawHistory = history.map((item) => ({
            ...item,
            bets: Array.isArray(item.bets) ? item.bets : []
          }))
        }

        if (Array.isArray(bets)) {
          this.bettingRecords = bets
          this.updateMockDataWithBets()
        }
      } catch (error) {
        console.error('Hydrate from API failed', error)
      }
    },

    async submitBet(betData) {
      try {
        const res = await API.createBet(betData)
        const order = {
          ...betData,
          orderId: generateOrderId(this.currentPeriod, res && res.id ? res.id : Math.floor(Date.now() % 10000)),
          createTime: Date.now(),
          timestamp: new Date().toLocaleString('zh-CN')
        }

        this.bettingRecords.push(order)
        this.updateMockDataWithBets()
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },

    deleteBet(orderId) {
      this.bettingRecords = this.bettingRecords.filter((record) => record.orderId !== orderId)
      this.updateMockDataWithBets()
    },

    async settleCurrentPeriod(drawNumbers) {
      const specialNumber = drawNumbers[6]
      const bets = []

      let totalBetAmount = 0
      let totalPayout = 0
      let winCount = 0

      for (const record of this.bettingRecords) {
        const winNumbers = (record.betNumbers || []).filter((number) => number === specialNumber)
        const payout = winNumbers.length * (record.betAmountPerNumber || 0) * 47

        totalBetAmount += record.totalAmount || 0
        totalPayout += payout
        if (payout > 0) winCount += 1

        bets.push({
          ...record,
          winNumbers,
          hasWin: payout > 0,
          payout,
          odds: 47,
          profit: (record.totalAmount || 0) - payout
        })
      }

      const record = {
        period: this.currentPeriod,
        drawNumbers,
        specialNumber,
        totalBets: this.bettingRecords.length,
        totalBetAmount,
        winCount,
        loseCount: this.bettingRecords.length - winCount,
        totalPayout,
        profit: totalBetAmount - totalPayout,
        drawTime: new Date().toLocaleString('zh-CN'),
        bets
      }

      try {
        await API.settle(record)
      } catch (error) {
        console.error('Settlement API failed', error)
      }

      this.drawHistory = [record, ...this.drawHistory.filter((item) => item.period !== this.currentPeriod)]
      return record
    }
  }
})
