import { useMemo, useState } from "react";
import { Typography } from "@material-tailwind/react";

import { MovieList } from "@/components";
import constant from "@/config/constant";

import SearchBar from "./components/SearchBar";

import { useSearchMovies, useTrendingMovies } from "@/hooks/movies";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: trendingMoviesData, isLoading: isLoadingTrending } =
    useTrendingMovies();
  const {
    data: searchedMoviesData,
    isLoading: isLoadingSearched,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchMovies(searchQuery);

  const trendingMovies = trendingMoviesData?.results.slice(
    0,
    constant.maxTrendingMovies,
  );

  const searchedMovies = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    () =>
      searchedMoviesData?.pages
        .map((item) => item.results as unknown as Movie[])
        .flat() as Movie[],
    [searchedMoviesData?.pages],
  );

  return (
    <section>
      <SearchBar onSearch={setSearchQuery} />
      {searchQuery !== "" ? (
        <MovieList
          movies={searchedMovies || []}
          isLoading={isLoadingSearched || isFetchingNextPage}
          hasMore={hasNextPage}
          onShowMore={fetchNextPage}
        />
      ) : (
        <div className="mt-9">
          <Typography type="h4">Trending Movies</Typography>
          <MovieList
            movies={trendingMovies || []}
            isLoading={isLoadingTrending}
          />
        </div>
      )}
    </section>
  );
};

export default HomeScreen;
