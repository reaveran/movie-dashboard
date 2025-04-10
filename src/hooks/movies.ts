import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { MovieApi } from "@/apis/MovieApi";

export const useTrendingMovies = () => {
  return useQuery<PaginationResponse<Movie[]>>({
    queryKey: ["trendingMoviesQuery"],
    queryFn: () => MovieApi.getTrendingMovies(),
  });
};

export const useSearchMovies = (query: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["searchMoviesQuery", query],
    queryFn: ({ pageParam = 1 }) => MovieApi.searchMovies(pageParam, query),
    getNextPageParam: (lastPage) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (lastPage.page < lastPage.total_pages) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: query !== "",
  });
};
