import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Heart, HeartSolid, Xmark } from "iconoir-react";

import { formatDate, getGenreList, getImageUrl } from "@/utils";
import { favoriteSelector } from "@/store/session/selectors";

import { useAddToFavorite, useRemoveFromFavorite } from "@/hooks/favorite";

type MovieDialogProps = {
  open: boolean;
  movie: Movie;
  onClose: () => void;
};

const MovieDialog: React.FC<MovieDialogProps> = ({ open, movie, onClose }) => {
  const addFavorite = useAddToFavorite();
  const removeFavorite = useRemoveFromFavorite();
  const favorite = useSelector(favoriteSelector);

  const isFavorite = favorite.find((view) => view.id === movie.id);

  const onToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Dialog open={open} size="lg" onOpenChange={onClose}>
      <Dialog.Overlay>
        <Dialog.Content className="p-0">
          <Dialog.DismissTrigger
            as={IconButton}
            size="sm"
            variant="ghost"
            color="secondary"
            isCircular
            className="absolute right-2 top-2 z-10 bg-black bg-opacity-50"
            onClick={onClose}
          >
            <Xmark className="h-5 w-5 text-white" />
          </Dialog.DismissTrigger>
          <img src={getImageUrl(movie.backdrop_path)} className="w-full" />
          <div className="p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 flex-nowrap">
              <div className="min-w-0">
                <Typography type="h6" className="leading-[1.4] font-semibold">
                  {movie.title}
                </Typography>
                <Typography type="small" className="text-gray-600">
                  Release date: {formatDate(movie.release_date)}
                </Typography>
              </div>
              <div className="shrink-0">
                {isFavorite ? (
                  <Button onClick={onToggleFavorite} variant="outline">
                    <HeartSolid className="mr-2" />
                    Added to favorites
                  </Button>
                ) : (
                  <Button
                    onClick={onToggleFavorite}
                    variant="solid"
                    className="border-primary hover:bg-primary-dark hover:border-primary-dark"
                  >
                    <Heart className="mr-2" /> Add to favorites
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-2">
              <Typography type="small" className="text-gray-800 font-semibold">
                Genre: {getGenreList(movie.genre_ids, "movie")}
              </Typography>
            </div>
            <div className="mt-3">
              <Typography className="leading-[1.4]">
                {movie.overview}
              </Typography>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default MovieDialog;
