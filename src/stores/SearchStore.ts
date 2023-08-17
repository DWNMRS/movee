import { defineStore } from "pinia";
import { IMovieSearch } from "@/interfaces/movies";

const url =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const status = "";

export const useSearchStore = defineStore("searchStore", {
  state: (): IMovieSearch => ({
    status: "",
    movies: [],
  }),
  actions: {
    async getMovies(search: string) {
      this.status = "loading";
      const res = await fetch(`${url}${search}`, {
        method: "GET",
        headers: {
          "X-API-KEY": "ef146b16-7614-471e-8273-a384301ea047",
          "Content-Type": "application/json",
        },
      });
      if (res.status >= 200 && res.status < 400) {
        this.status = "success";
        const data = await res.json();
        this.movies = data.films;
      } else if (res.status >= 400) {
        this.status = "error"
      }
    },
  },
});
