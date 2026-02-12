<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAppStore } from './stores/app'

const store = useAppStore()
const route = useRoute()

const navItems = [
  { to: '/betting', name: '投注管理', short: '投', icon: 'B' },
  { to: '/analysis', name: '风险分析', short: '析', icon: 'A' },
  { to: '/settlement', name: '开奖结算', short: '结', icon: 'S' }
]

const pageTitle = computed(() => {
  const current = navItems.find((item) => item.to === route.path)
  return current ? current.name : '控制台'
})
</script>

<template>
  <div class="app-shell">
    <aside class="shell-sidebar">
      <div class="shell-brand">
        <div class="brand-mark">L6</div>
        <div>
          <h1>庄家系统</h1>
          <p>Lottery Admin</p>
        </div>
      </div>

      <div class="shell-meta">
        <p>当前页面</p>
        <strong>{{ pageTitle }}</strong>
      </div>

      <nav class="shell-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="shell-nav-item"
          active-class="active"
        >
          <span class="shell-nav-icon">{{ item.icon }}</span>
          <span class="shell-nav-text">{{ item.name }}</span>
          <span class="shell-nav-mobile">{{ item.short }}</span>
        </RouterLink>
      </nav>

      <div class="shell-period">
        <p>当前期数</p>
        <strong>{{ store.currentPeriod }}</strong>
      </div>
    </aside>

    <main class="shell-main">
      <RouterView />
    </main>

    <div id="toast-container" class="toast-container"></div>
  </div>
</template>
