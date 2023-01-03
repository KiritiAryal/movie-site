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
      const data = [...state.watchlistObj, ...payload];
      let unique = data.filter(
        ({ id }, i) => i === data.findIndex(({ id: _id }) => id === _id)
      );
      state.watchlistObj = unique;
      console.log(state.watchlistObj);
    },
    setWatchlistCt(state) {
      state.watchlistCt = state.watchlistObj.length;
      console.log(state.watchlistCt);
    },
  },
});

export const { setWatchlistObj, setWatchlistCt } = watchlistSlice.actions;
export default watchlistSlice.reducer;
