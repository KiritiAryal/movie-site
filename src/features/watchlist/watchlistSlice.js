import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlistObj: [],
  watchlistCt: 0,
};
const watchlistSlice = createSlice({
  name: "watchlistSlice",
  initialState,
  reducers: {
    setWatchlistObj(state, { payload }) {
      // let arrayUniqueByKey;

      // const array = [state.watchlistObj, payload];
      // arrayUniqueByKey = [
      //   ...new Map(array.map((item) => [item[array.id], item])).values(),
      // ];
      const data = [...state.watchlistObj, ...payload];
      console.log(data);
      let unique = [...new Set(data.map((item) => item.Group))];
      console.log(unique);

      state.watchlistObj = arrayUniqueByKey;
    },
    setWatchlistCt(state, { payload }) {
      state.watchlistCt = payload;
    },
    addWatchlistCt(state, { payload }) {
      state.watchlistCt = state.watchlistCt + payload;
    },
  },
});

export const { setMovieId, setWatchlistObj, setWatchlistCt, addWatchlistCt } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
