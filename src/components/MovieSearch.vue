<template>
  <div class="movie-search">
    <h1 class="h1">Поиск</h1>
    <form class="movie-search__form" @submit.prevent="searchStore.getMovies(searchMovie)">
      <input class="movie-search__form-input" type="text" placeholder="Поиск по названию" v-model="searchMovie">
      <button>
        <AppIcon class="movie-search__form-icon" :width="24" :height="24" :name="EIconNames.Search" />
      </button>

    </form>
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

<style scoped lang="scss">.movie {
  &-search {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__form {
      position: relative;
      width: 100%;
      padding: 10px;
      margin-bottom: 50px;
      border-radius: 20px;
      border: 10px solid $background-secondary;
      transition: 0.2s;
      display: flex;

      &-input {
        background-color: $background;
        color: $white;
        width: 100%;
        height: 30px;
        padding: 0 10px;
        border-radius: 5px;

        &::placeholder {
          color: $text-secondary;
        }
      }
    }

    &__result {
      display: flex;
      flex-direction: column;
      gap: 32px;
      overflow: auto;
      padding-right: 16px;

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
}
</style>