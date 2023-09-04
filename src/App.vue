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
import { watch } from "vue";
import router from "./router/router";
import { register } from 'swiper/element/bundle';
register()
watch(() => router.currentRoute.value.meta, (newRoute) => {
  document.title =`Movee | ${newRoute.title}`
}) 


</script>



<style lang="scss">
@import "./styles/main.scss";

.main {
  width: 100%;
  min-height: 100vh;
  background-color: $black;
  color: $white;

  display: flex;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
}
</style>
