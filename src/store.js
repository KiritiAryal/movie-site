import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./features/displayMovies/moviesSlice";
import watchlistSlice from "./features/watchlist/watchlistSlice";

export const store = configureStore({
  reducer: { movies: moviesSlice, watchlist: watchlistSlice },
});
