import { SirCoApi } from "@/modules/SirCoApi";

import { dummyMovies } from "@/__test__/mockData";

const getTrendingMovies = () => {
  return dummyMovies;
};

// const getTrendingMovies = async () => {
//   return SirCoApi.get("/trending/movie/day");
// };

const searchMovies = async (page: number, query: string) => {
  return SirCoApi.get("/search/movie", { page, query });
};

export const MovieApi = {
  getTrendingMovies,
  searchMovies,
};
