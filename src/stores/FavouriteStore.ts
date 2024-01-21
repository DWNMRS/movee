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
      const idx = this.movies.findIndex((el) => el.kinopoiskId === id);
      this.movies[idx].isWatched = !this.movies[idx].isWatched;
      localStorage.setItem('movies', JSON.stringify(this.movies))
    },
    toggleFavourite(movie: IMovie) {
      if(movie.kinopoiskId) {
        if (this.movies.some((item) => item.kinopoiskId === movie.kinopoiskId)) {
          this.movies = this.movies.filter(
            (el) => el.kinopoiskId !== movie.kinopoiskId
          );
        } else {
          this.movies.unshift({ ...movie, isWatched: false });
        }
      } else if( movie.filmId) {
        if (this.movies.some((item) => item.filmId === movie.filmId)) {
          this.movies = this.movies.filter(
            (el) => el.filmId !== movie.filmId
          );
        } else {
          this.movies.unshift({ ...movie, isWatched: false });
        }
      }
      localStorage.setItem('movies', JSON.stringify(this.movies))
    },
  },
});
