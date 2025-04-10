import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setFavorite } from "@/store/session/reducer";
import { favoriteSelector } from "@/store/session/selectors";

export const useAddToFavorite = () => {
  const favorite = useSelector(favoriteSelector);
  const dispatch = useDispatch();
  return useCallback(
    (movie: Movie) => {
      const selected = favorite.find((view) => view.id === movie.id);

      if (!selected) {
        dispatch(setFavorite([movie, ...favorite]));
      }
    },
    [dispatch, favorite],
  );
};

export const useRemoveFromFavorite = () => {
  const favorite = useSelector(favoriteSelector);
  const dispatch = useDispatch();
  return useCallback(
    (movieId: number) => {
      const selected = favorite.findIndex((view) => view.id === movieId);

      if (selected > -1 && favorite.length > 0) {
        const result = [...favorite];
        result.splice(selected, 1);
        dispatch(setFavorite(result));
      }
    },
    [dispatch, favorite],
  );
};
