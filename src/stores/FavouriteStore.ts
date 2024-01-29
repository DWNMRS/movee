import { defineStore } from "pinia";
import { IFavouriteStore } from "../interfaces/movies";
import { IMovie } from "@/interfaces/movies";

export const useFavouriteStore = defineStore("favouriteStore", {
  state: (): IFavouriteStore => ({
    movies: [],
    activeTab: 1,
  }),
  getters: {
    watchedMovies(): IFavouriteStore["movies"] {
      return this.movies.filter((el) => el.isWatched);
    },
    unWatchedMovies(): IFavouriteStore["movies"] {
      return this.movies.filter((el) => el.isWatched === false);
    },
  },
  actions: {
    setActiveTab(id: number) {
      this.activeTab = id;
    },
    toggleWatch(id: number) {
      const movie = this.movies.find((el) => el.kinopoiskId === id);
    
      if (movie) {
        movie.isWatched = !movie.isWatched;
        localStorage.setItem('movies', JSON.stringify(this.movies));
      }
    },
    toggleFavourite(movie: IMovie) {
      const key = movie.kinopoiskId ? 'kinopoiskId' : movie.filmId ? 'filmId' : null;
    
      if (key) {
        const id = movie[key];
    
        if (this.movies.some((item) => item[key] === id)) {
          this.movies = this.movies.filter((el) => el[key] !== id);
        } else {
          this.movies.unshift({ ...movie, isWatched: false });
        }
    
        localStorage.setItem('movies', JSON.stringify(this.movies));
      }
    },
  },
});
