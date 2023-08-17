<template>
  <div class="movie-search">
    <form class="movie-search__form" @submit.prevent="searchStore.getMovies(searchMovie)">
      <input class="movie-search__form-input" type="text" placeholder="Поиск по названию" v-model="searchMovie">
    </form>
    <Loader v-if="searchStore.status == 'loading'" />
    <div v-else-if="searchStore.status == 'success'">
      <MovieCard v-for="movie of searchStore.movies" :key="movie.filmId" :movie="movie" :is-search="true" />
    </div>

    <AppIcon class="" :width="19" :height="20" :name="EIconNames.Search" />
  </div>
</template>

<script setup lang="ts">
import Loader from './AppLoader.vue';
import MovieCard from './MovieСard.vue';
import AppIcon from '@/assets/icons/AppIcon.vue'
import { EIconNames } from '@/assets/icons/types'
import { ref } from 'vue';
import { useSearchStore } from '@/stores/SearchStore';

const searchStore = useSearchStore()
const searchMovie = ref('')

</script>

<style scoped lang="scss">
.movie {
  &-search {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__form {
      width: 100%;
      padding: 10px;
      margin-bottom: 50px;
      border-radius: 10px;
      background-color: $dark;
      transition: 0.2s;

      &-input {
        background-color: $black;
        color: $white;
        width: 100%;
        height: 40px;
        padding: 0 10px;
        border-radius: 5px;

        &::placeholder {
          color: $text-tertiary;
        }
      }
    }

    & p,
    .p {
      text-align: center;
    }
  }
}
</style>