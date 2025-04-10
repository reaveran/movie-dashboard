type MovieType = "movie" | "tvShow";

type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  original_title: string;
  original_language: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  video: boolean;
};
