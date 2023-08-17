<template>
  <nav class="sidebar-nav">
    <router-link class="sidebar-nav-item" v-for="item of sidebarItems" :to="item.path">{{ item.title }}</router-link>
  </nav>
</template>

<script setup lang='ts'>
interface ISidebarItem {
  path: string,
  title: string
}
const sidebarItems: ISidebarItem[] = [
  {
    path: "/premieres",
    title: "Премьеры",
  },

  {
    path: "/search",
    title: "Поиск",
  },
  {
    path: "/favourite",
    title: "Мои Фильмы",
  },
  {
    path: "/about",
    title: 'О приложении',
  },

]
</script>

<style scoped lang="scss">
.sidebar-nav {
  background-color: $transparent;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 33px;
    padding: 5px 9px;
    border-radius: 5px;
    color: $white;
    transition: 0.2s;

    &+& {
      margin-top: 20px;
    }

    &:hover {
      background-color: #FFFFFF26;
    }
  }
}
</style>