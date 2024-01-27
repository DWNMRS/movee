<template>
  <div class="movie-favourite">
    <h1 class="h1">Мои Фильмы</h1>
    <div class="movie-favourite__tabs">
      <button
        :class="['movie-favourite__tabs-btn', { 'movie-favourite__tabs-btn--active': favouriteStore.activeTab === 1 }]"
        @click="setTab(1)">
        Все: {{ favouriteStore.movies.length }}
      </button>
      <button
        :class="['movie-favourite__tabs-btn', { 'movie-favourite__tabs-btn--active': favouriteStore.activeTab === 2 }]"
        @click="setTab(2)">
        Просмотренные: {{ favouriteStore.watchedMovies.length }}
      </button>
      <button
        :class="['movie-favourite__tabs-btn', { 'movie-favourite__tabs-btn--active': favouriteStore.activeTab === 3 }]"
        @click="setTab(3)">
        Не просмотренные: {{ favouriteStore.unWatchedMovies.length }}
      </button>
    </div>
    <div v-if="favouriteStore.activeTab === 1" class="movie-favourite__list">
      <MovieCard v-for="movie of favouriteStore.movies" :key="movie.filmId" :movie="movie" />
    </div>
    <div v-if="favouriteStore.activeTab === 2" class="movie-favourite__list">
      <MovieCard v-for="movie of favouriteStore.watchedMovies" :key="movie.filmId" :movie="movie" />
    </div>
    <div v-if="favouriteStore.activeTab === 3" class="movie-favourite__list">
      <MovieCard v-for="movie of favouriteStore.unWatchedMovies" :key="movie.filmId" :movie="movie" />
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
.movie-favourite {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    border-bottom: 2px solid #FFFFFF14;

    &-btn {
      width: auto;
      height: 40px;
      font-size: 14px;
      color: $text-disabled;
      cursor: pointer;
      border-bottom: 2px solid transparent;

      &:hover {
        transition: 0.2s;
        opacity: 0.8;
      }

      @include break-sm {
        font-size: 12px;
      }

      &--active {
        color: $white;
        border-bottom: 2px solid $accent-secondary;
        background-color: #FFFFFF26;

        &:hover {
          color: $white;
          border-bottom: 2px solid $accent-secondary;
          background-color: #FFFFFF26;
        }
      }
    }
  }

  &__list {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow: auto;
    padding-right: 16px;

    @include break-md {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 16px;
      padding: 0;
    }

    &::-webkit-scrollbar {
      background-color: #FFFFFF14;
      border-radius: 4px;
      width: 4px;
      margin: 10px 0;

      &-thumb {
        width: 2px;
        border-radius: 2px;
        background-color: $border-hover;
      }

      @include break-md {
        display: none;
      }
    }
  }
}
</style>