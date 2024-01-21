<template>
  <div class="movie-favourite">
    <div class="tabs">
      <button :class="['btn', { btn_active: favouriteStore.activeTab === 1 }]" @click="setTab(1)">
        Все: {{ favouriteStore.movies.length }}
      </button>
      <button :class="['btn', { btn_active: favouriteStore.activeTab === 2 }]" @click="setTab(2)">
        Просмотренные: {{ favouriteStore.watchedMovies.length }}
      </button>
      <button :class="['btn', { btn_active: favouriteStore.activeTab === 3 }]" @click="setTab(3)">
        Не просмотренные: {{ favouriteStore.unWatchedMovies.length }}
      </button>
    </div>
    <div v-if="favouriteStore.activeTab === 1">
      <div class="movie-favourite__list">
        <MovieCard v-for="movie of favouriteStore.movies" :key="movie.filmId" :movie="movie" />
      </div>
    </div>
    <div v-if="favouriteStore.activeTab === 2">
      <div class="movie-favourite__list">
        <MovieCard v-for="movie of favouriteStore.watchedMovies" :key="movie.filmId" :movie="movie" />
      </div>
    </div>
    <div v-if="favouriteStore.activeTab === 3">
      <div class="movie-favourite__list">
        <MovieCard v-for="movie of favouriteStore.unWatchedMovies" :key="movie.filmId" :movie="movie" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import { useFavouriteStore } from '@/stores/FavouriteStore';
import MovieCard from './MovieСard.vue';

const favouriteStore = useFavouriteStore();
const setTab = (id: number) => {
  favouriteStore.setActiveTab(id)
}



</script>


<style scoped lang="scss" >

.movie-favourite__list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  
  @include break-sm {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
  }
}
.btn {
  border: none;
  width: auto;
  height: 40px;
  font-size: 14px;
  color: $text-disabled;
  cursor: pointer;

  @include break-sm {
    font-size: 12px;
  }
}

.btn:hover {
  transition: 0.2s;
  opacity: 0.7;
}

.btn_active {
  border-bottom: 1px solid $white;
  background-color: #FFFFFF26;


}

.btn .btn_active:hover {
  border-bottom: 2px solid $white;
  background-color: #FFFFFF26;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid #FFFFFF14;
}
</style>