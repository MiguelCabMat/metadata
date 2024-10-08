import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
}

interface FavoriteState {
  favoriteMovies: Movie[];
}

const initialState: FavoriteState = {
  favoriteMovies: [],
};

export const favoriteSlice = createSlice({
  name: "favoritas",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movieExist = state.favoriteMovies.some(
        (movie) => movie.imdbID === action.payload.imdbID
      );

      if (movieExist) {
        state.favoriteMovies = state.favoriteMovies.filter(
          (movie) => movie.imdbID !== action.payload.imdbID
        );
      } else {
        state.favoriteMovies.push(action.payload);
      }
    },
    addFavorite: (state, action: PayloadAction<Movie>) => {
      if (
        !state.favoriteMovies.find(
          (movie) => movie.imdbID === action.payload.imdbID
        )
      ) {
        state.favoriteMovies.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
