import { useRef, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";

import MovieCard from "../MovieCard/MovieCard";
import MovieDialog from "../MovieDialog/MovieDialog";

type MovieListProps = {
  movies: Movie[];
  isLoading?: boolean;
  hasMore?: boolean;
  onShowMore?: () => void;
};

const MovieList: React.FC<MovieListProps> = ({
  movies,
  isLoading,
  hasMore,
  onShowMore,
}) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const onClickMovieCard = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpenDetails(true);
  };

  const onClose = () => {
    setOpenDetails(false);
    setSelectedMovie(undefined);
  };

  const renderSkeleton = () => {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-4">
        {[0, 1, 2, 3].map((data) => (
          <div className="max-w-full animate-pulse mt-4" key={data.toString()}>
            <div className="relative grid h-80 place-items-center bg-gray-300 rounded-md" />
          </div>
        ))}
      </div>
    );
  };

  const handleShowMore = () => {
    onShowMore?.();
    setTimeout(() => {
      const scrollTop = lastItemRef.current?.offsetTop || 0;
      window.scrollTo({
        top: scrollTop - 50,
        behavior: "smooth",
      });
    }, 200);
  };

  if (!isLoading && movies.length === 0) {
    return (
      <div className="mt-8">
        <Typography>No movie found</Typography>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-8">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onClickMovieCard(movie)}
            ref={index === movies.length - 1 ? lastItemRef : null}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleShowMore} variant="outline">
            Show more
          </Button>
        </div>
      )}

      {isLoading && renderSkeleton()}

      {selectedMovie && (
        <MovieDialog
          open={openDetails}
          movie={selectedMovie}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default MovieList;
