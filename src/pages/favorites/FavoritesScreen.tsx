import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";

import { MovieList } from "@/components";
import { favoriteSelector } from "@/store/session/selectors";

const FavoritesScreen = () => {
  const favorite = useSelector(favoriteSelector);
  return (
    <section>
      <Typography type="h5">Favorites Movies</Typography>
      <MovieList movies={favorite} />
    </section>
  );
};

export default FavoritesScreen;
