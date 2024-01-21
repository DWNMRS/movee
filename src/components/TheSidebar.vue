<template>
  <div :class="['sidebar', { 'sidebar--opened': isOpened === true }]">
    <div class="sidebar__header">
      <router-link class="app-name" :to="'/'" @click="closeMobileMenu">
        Movee</router-link>
      <button class="sidebar__burger" @click="openCloseMobileMenu">
        <AppIcon v-if="!isOpened" :width="19" :height="14" :name="EIconNames.Burger" />
        <AppIcon v-if="isOpened" :width="13" :height="14" :name="EIconNames.Cross" />
      </button>
    </div>
    <nav class="sidebar-nav">
      <router-link class="sidebar-nav__item" v-for="item of sidebarItems" :to="item.path" @click="closeMobileMenu">{{
        item.title }}</router-link>
    </nav>
    <a href="https://t.me/downmars" target="_blank" class="sidebar-nav__item">Telegram</a>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import AppIcon from '@/assets/icons/AppIcon.vue'
import { EIconNames } from '@/assets/icons/types';

const isOpened = ref<boolean>(false)

function closeMobileMenu() {
  isOpened.value = false
}

function openCloseMobileMenu() {
  if (isOpened.value === false) {
    isOpened.value = true
  } else {
    closeMobileMenu()
  }
}

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
]
</script>

<style scoped lang="scss">
.router-link-active {
  &.sidebar-nav__item {
    background-color: #FFFFFF26;
  }
}

.sidebar {
  position: fixed;
  width: 200px;
  height: 100%;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: $background-accent;
  z-index: 10;
  transition: height 0.3s ease-in-out;

  @include break-xl {
    background: $background-accent-horizontal;
    width: 100%;
    height: 80px;
    padding: 10px 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  @include break-sm {
    height: 60px;
    flex-direction: column;
    justify-content: normal;
    overflow: hidden;
    padding: 0;

    &--opened {
      height: 300px;
    }
  }



  &__header {
    margin-bottom: 120px;

    @include break-xl {
      margin-bottom: 0;
    }

    @include break-sm {
      position: relative;
      width: 100%;
      min-height: 60px;
      display: flex;
      justify-content: center;
      margin-bottom: 0;

    }
  }

  &__burger {
    display: none;
    position: absolute;
    right: 10px;
    width: 32px;
    height: 100%;
    align-items: center;
    justify-content: center;

    @include break-sm {
      display: flex;
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    @include break-xl {
      flex-direction: row;
      align-items: center;
    }
  }

  &-nav {
    background-color: $transparent;
    width: 100%;
    display: flex;
    flex-direction: column;


    @include break-xl {
      flex-direction: row;
      width: auto;
    }

    @include break-sm {
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: auto;
      padding: 20px 0px;
      border-bottom: 1px solid #ffffff29;
      border-top: 1px solid #ffffff29;
    }

    &__item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 32px;
      padding: 4px 8px;
      border-radius: 5px;
      color: $white;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        background-color: #FFFFFF26;
      }

      @include break-xl {
        width: auto;
        padding: 0 9px;
      }

      @include break-sm {
        width: 100%;
        border-radius: 0;
        padding: 10px;
        height: 50px;
        justify-content: center;
      }

      &+& {
        margin-top: 24px;

        @include break-xl {
          margin-top: 0;
          margin-left: 20px;
        }

        @include break-md {
          margin-left: 10px;
        }

        @include break-sm {
          margin-left: 0;

        }
      }
    }
  }
}
</style>

