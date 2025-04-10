import { forwardRef } from "react";
import { Card, Typography } from "@material-tailwind/react";

import { formatDate, getImageUrl } from "@/utils";

type MovieCardProps = {
  movie: Movie;
  onClick: () => void;
};

const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
  ({ onClick, movie }, ref) => {
    return (
      <Card
        ref={ref}
        className="rounded-md overflow-hidden bg-white border-0 cursor-pointer"
        onClick={onClick}
        data-testid={`movie-${movie.id}`}
      >
        <div>
          <div className="aspect-[2/3] w-full bg-gray-100 relative">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="px-3 py-2 ">
            <Typography className="leading-[1.4] line-clamp-2">
              {movie.title}
            </Typography>
            <Typography type="small" className="text-gray-600">
              {formatDate(movie.release_date, true)}
            </Typography>
          </div>
        </div>
      </Card>
    );
  },
);

export default MovieCard;
