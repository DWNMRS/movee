import { defineStore } from "pinia";
import { IMoviesStore } from "../interfaces/movies";

export const useMovieStore = defineStore("movieStore", {
  state: (): IMoviesStore => ({
    movies: [
      {
        filmId: 1,
        type: "adsad",
        kinopoiskId:123123,
        nameRu: "Spider-man",
        filmLength: "awdawd",
        description: "blabla",
        posterUrlPreview: "/",
        posterUrl: "/",
        year: "12.03.12",
        isWatched: false,
        countries: [
          {
            country: "awdawd",
          },
        ],
        genres: [
          {
            genre: "awdawd",
          },
        ],
      },
      {
        filmId: 1,
        type: "adsad",
        kinopoiskId:123123,
        nameRu: "Spider-man",
        filmLength: "awdawd",
        description: "blabla",
        posterUrlPreview: "/",
        posterUrl: "/",
        year: "12.03.12",
        isWatched: false,
        countries: [
          {
            country: "awdawd",
          },
        ],
        genres: [
          {
            genre: "awdawd",
          },
        ],
      },
    ],
    activeTab: 2,
  }),
  getters: {
    watchedMovies(): IMoviesStore["movies"] {
      return this.movies.filter((el) => el.isWatched);
    },
  },
  actions: {
    setActiveTab(id: number) {
      this.activeTab = id;
    },
    toggleWatch(id: number) {
      const idx = this.movies.findIndex((el) => el.filmId === id);
      if (idx !== -1) {
        this.movies[idx].isWatched = !this.movies[idx].isWatched;
      }
    },
    deleteMovie(id: number) {
      this.movies = this.movies.filter((el) => el.filmId !== id);
    },
  },
});
