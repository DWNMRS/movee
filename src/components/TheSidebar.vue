<template>
  <div class="sidebar">
    <span class="app-name">Movee</span>
    <TheSidebarNav />
    <span>Telegram</span>
  </div>
</template>s


<script setup lang="ts">
import TheSidebarNav from '@/components/TheSidebarNav.vue'
</script>

<style scoped lang="scss">
.sidebar {
  background: $background-accent;
  position: fixed;
  padding: 50px 20px;
  width: 230px;
  height: 100%;
  display: flex;
  flex-direction: column;
justify-content: space-between;
}
</style>

