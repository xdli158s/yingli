<template>
  <article class="stat-card" :class="toneClass">
    <p class="stat-label">{{ label }}</p>
    <p class="stat-value">{{ value }}</p>
    <p v-if="note" class="stat-note">{{ note }}</p>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  note: { type: String, default: '' },
  tone: { type: String, default: 'neutral' }
})

const toneClass = computed(() => `tone-${props.tone}`)
</script>
