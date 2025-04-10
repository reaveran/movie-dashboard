import { movieGenreMap, tvShowGenreMap } from "@/config/genreMap";

export const getGenreList = (list: number[], type: MovieType) => {
  const map = type === "movie" ? movieGenreMap : tvShowGenreMap;
  const selectedGenre = map.filter((genre) => list.includes(genre.id));

  const genres = selectedGenre.map((genre) => genre.name);
  return genres?.length ? genres.join(", ") : "-";
};
