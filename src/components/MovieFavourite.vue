<template>
  <div class="moviesPage">
    <h2>My Favorite Movies</h2>
    <!-- <div class="tabs">
      <button :class="['btn', { btn_green: movieStore.activeTab === 1 }]" @click="setTab(1)">
        Favorite
      </button>
      <button :class="['btn', { btn_green: movieStore.activeTab === 2 }]" @click="setTab(2)">
        Search
      </button>
    </div>
    <div class="movies" v-if="movieStore.activeTab === 1">
      <div>
        <h3>All Movies(count:{{ movieStore.movies.length }})</h3>
        <MovieCard v-for="movie of movieStore.movies" :key="movie.filmId" :movie="movie" />
      </div>
      <div>
        <h3>Watched Movies(count:{{ movieStore.watchedMovies.length }})</h3>
        <MovieCard v-for="movie of movieStore.watchedMovies" :key="movie.filmId" :movie="movie" />
      </div>

    </div> -->
    <!-- <div class="search" v-else>
      awdawdadad
    </div> -->
  </div>
</template>


<script setup lang="ts">

// import { useMovieStore } from '@/stores/MovieStore';
// import MovieCard from './MovieСard.vue';

// const movieStore = useMovieStore();
// const setTab = (id: number) => {
//   movieStore.setActiveTab(id)
// }

</script>


<style lang="scss" scoped>
.btn {
  border: none;
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;
}

.btn:hover {
  opacity: 0.7;
}

.btn_green {
  background: #37df5c;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>