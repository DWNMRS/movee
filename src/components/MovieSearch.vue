<template>
  <div class="movie-search">
    <h1 class="h1">Поиск</h1>
    <div class="movie-search__form-wrapper">
      <form class="movie-search__form" @submit.prevent="searchStore.getMovies(searchMovie)">
        <input class="movie-search__form-input" type="text" placeholder="Поиск по названию" v-model="searchMovie">
        <button>
          <AppIcon class="movie-search__form-icon" :width="24" :height="24" :name="EIconNames.Search" />
        </button>
      </form>
    </div>
    <Loader v-if="searchStore.status == 'loading'" />
    <div v-else-if="searchStore.status == 'success'" class="movie-search__result">
      <MovieCard v-for="movie of searchStore.movies" :key="movie.filmId" :movie="movie" is-search />
    </div>


  </div>
</template>

<script setup lang="ts">
import Loader from './AppLoader.vue';
import MovieCard from './MovieСard.vue';
import AppIcon from '@/assets/icons/AppIcon.vue'
import { ref } from 'vue';
import { useSearchStore } from '@/stores/SearchStore';
import { EIconNames } from '@/assets/icons/types';

const searchStore = useSearchStore()
const searchMovie = ref('')

</script>

<style scoped lang="scss">
.movie-search {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__form {
    width: 100%;
    padding: 10px;
    border-radius: 12px;
    border: 10px solid $background-secondary;
    background-color: $background;
    transition: 0.2s;
    display: flex;
    z-index: 10;

    &-wrapper {
      position: sticky;
      top: 0px;
      padding: 32px 0;
      background-color: $background;
      z-index: 5;

      @include break-xl {
        top: 80px;
      }

      @include break-md {
        top: 60px;
        padding: 16px 0;
      }
    }

    &-input {
      background-color: $background;
      color: $white;
      width: 100%;
      height: 30px;
      padding: 0 10px;
      border-radius: 6px;

      &::placeholder {
        color: $text-secondary;
      }
    }
  }

  &__result {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @include break-md {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 16px;
    }

    &::-webkit-scrollbar {
      background-color: #FFFFFF14;
      border-radius: 4px;
      width: 4px;

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