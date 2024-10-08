import { useSelector, useDispatch } from "react-redux";
import Cards from "../Cards/Cards";
import { RootState } from "../../Store/store";
import { toggleFavorite } from "../../Store/favoriteSlice";

const Favorites: React.FC = () => {
  const favoriteMovies = useSelector(
    (state: RootState) => state.favorites.favoriteMovies
  );
  const dispatch = useDispatch();

  const handleFavoriteToggle = (movie: any) => {
    dispatch(toggleFavorite(movie));
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <p className="text-muted">
          Mostrando{" "}
          <span className="text-danger font-weight-bold">
            {favoriteMovies.length}
          </span>{" "}
          favoritos
        </p>
      </div>
      <h2>Favoritos</h2>
      {favoriteMovies.length === 0 ? (
        <p>No tienes películas favoritas aún.</p>
      ) : (
        <div className="row">
          {favoriteMovies.map((movie) => (
            <Cards
              key={movie.imdbID}
              movie={movie}
              isFavorite={true}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
