<template>
  <section class="app-card">
    <header v-if="title || subtitle || $slots.actions" class="app-card-head">
      <div>
        <h2 v-if="title">{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="app-card-actions">
        <slot name="actions" />
      </div>
    </header>
    <div class="app-card-body">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' }
})
</script>
