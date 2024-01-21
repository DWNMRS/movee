type TStatus = "success" | "loading" | "error" | "";

export interface IMovie {
  realIndex:number;
  filmId: number;
  kinopoiskId: number;
  type: string;
  nameRu: string;
  filmLength: string;
  description: string;
  shortDescription: string;
  posterUrlPreview: string;
  posterUrl: string;
  year: string;
  isWatched: boolean;
  countries: {
    country: string;
  }[];
  genres: {
    genre: string;
  }[];
}

export interface IFavouriteStore {
  movies: IMovie[];
  activeTab: number;
}

export interface IMovieSearch {
  movies: IMovie[];
  status: TStatus;
}

export interface IMovieInfo {
  movies: IMovie[];
  status: TStatus;
  images: {
    [key:string]:string[]
  };
}
