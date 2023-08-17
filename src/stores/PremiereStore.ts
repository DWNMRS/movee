import { defineStore } from "pinia";
import { IMovieSearch } from "@/interfaces/movies";

const currentDate = new Date();
const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const year = currentDate.getFullYear().toString();
const currentMonth = months[currentDate.getMonth()];


const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${currentMonth}`;
const status = "";

export const usePremiereStore = defineStore("premiereStore", {
  state: (): IMovieSearch => ({
    status: "",
    movies: [],
  }),
  actions: {
    async getPremieres() {
      this.status = "loading";
      const res = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "X-API-KEY": "ef146b16-7614-471e-8273-a384301ea047",
          "Content-Type": "application/json",
        },
      });
      if (res.status >= 200 && res.status < 400) {
        this.status = "success";
        const data = await res.json();
        this.movies = data.items;
      } else if (res.status >= 400) {
        this.status = "error";
      }
    },
  },
});
