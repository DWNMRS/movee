<template>
  <main class="main">
    <TheSidebar />
    <router-view />
    <AppIconSprite />
  </main>
</template>

<script setup lang="ts">

import TheSidebar from "@/components/TheSidebar.vue";
import AppIconSprite from "@/assets/icons/AppIconSprite/AppIconSprite.vue"
import { watch, onMounted } from "vue";
import { useFavouriteStore } from '@/stores/FavouriteStore';
import router from "./router/router";
import { register } from 'swiper/element/bundle';
register()
watch(() => router.currentRoute.value.meta, (newRoute) => {
  document.title = `Movee | ${newRoute.title}`
})
const favouriteStore = useFavouriteStore();

onMounted(() => {
  loadMoviesFromLocalStorage()
})

function loadMoviesFromLocalStorage() {
  const storedMovies = localStorage.getItem('movies');
  if (storedMovies) {
    favouriteStore.movies = JSON.parse(storedMovies);
  }
}


</script>



<style lang="scss">
@import "./styles/main.scss";

body {
  background-color: $background;

  &::-webkit-scrollbar {
    background-color: #FFFFFF14;
    width: 14px;

    &-thumb {
      width: 4px;
      border-radius: 2px;
      background-color: $border-hover;
    }

    @include break-md {
      display: none;
    }
  }
}

#app {
  height: 100%;
}

.main {
  margin: 0 auto;
  max-width: 1920px;
  width: 100%;
  height: 100%;
  color: $text;
  font-family: "Source Sans Pro", sans-serif;

  
}
</style>
