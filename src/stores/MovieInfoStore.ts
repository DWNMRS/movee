import { defineStore } from "pinia";
import { IMovieInfo } from "@/interfaces/movies";

const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/`;
const status = "";

export const useMovieInfo = defineStore("movieInfo", {
  state: (): IMovieInfo => ({
    status: "",
    movies: [],
    images: {},
  }),
  actions: {
    async getMovieInfo(activeMovieId: number) {
      this.status = "loading";
      const res = await fetch(`${url}${activeMovieId}`, {
        method: "GET",
        headers: {
          "X-API-KEY": "ef146b16-7614-471e-8273-a384301ea047",
          "Content-Type": "application/json",
        },
      });
      if (res.status >= 200 && res.status < 400) {
        this.status = "success";
        const data = await res.json();
        this.movies.push(data);
      } else if (res.status >= 400) {
        this.status = "error";
      }
    },
    async getMovieImages(activeMovieId: number) {
      this.status = "loading";
      const res = await fetch(
        `${url}${activeMovieId}/images?type=STILL&page=1`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "ef146b16-7614-471e-8273-a384301ea047",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status >= 200 && res.status < 400) {
        this.status = "success";
        const data = await res.json();
        let imagesMovie = data.items.map((item:any) => {
          return item.imageUrl;
        });
        if (!this.images[activeMovieId]) {
          this.images[activeMovieId] = imagesMovie;
        }
      } else if (res.status >= 400) {
        this.status = "error";
      }
    },
  },
});

