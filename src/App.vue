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

#app {
  display: flex;
  justify-content: center;
  background-color: $black;
}

.main {
  width: 100%;
  max-width: 1920px;
  min-height: 100vh;
  background-color: $black;
  color: $white;
  display: flex;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
}
</style>
