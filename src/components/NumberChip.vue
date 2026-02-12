<template>
  <span
    class="number-chip"
    :class="[sizeClass, `chip-wave-${wave}`, { 'with-zodiac': showZodiac, 'is-selected': selected }]"
  >
    <span class="chip-number">{{ padded }}</span>
    <small v-if="showZodiac" class="chip-zodiac">{{ zodiac }}</small>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { getNumberWaveColor, getZodiacForNumber } from '../utils/common'

const props = defineProps({
  number: { type: Number, required: true },
  showZodiac: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
  size: { type: String, default: 'md' }
})

const padded = computed(() => String(props.number).padStart(2, '0'))
const wave = computed(() => getNumberWaveColor(props.number))
const zodiac = computed(() => getZodiacForNumber(props.number))
const sizeClass = computed(() => `chip-${props.size}`)
</script>
