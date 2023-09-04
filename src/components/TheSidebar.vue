<template>
  <div class="sidebar">
    <span class="app-name">Movee</span>
    <TheSidebarNav />
    <span>Telegram</span>
  </div>
</template>


<script setup lang="ts">
import TheSidebarNav from '@/components/TheSidebarNav.vue'
</script>

<style scoped lang="scss">
.sidebar {
  background: $background-accent;
  position: fixed;
  padding: 50px 20px;
  width: 190px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include break-xl {
    background: $background-accent-horizontal;
    width: 100%;
    height: 80px;
    padding: 10px 40px;
    flex-direction: row;
    align-items: center;
  }
}
</style>

