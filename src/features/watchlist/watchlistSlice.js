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
    },
    remove(state, { payload }) {
      state.watchlistObj = state.watchlistObj.filter(
        (item) => item.id !== payload
      );
      state.watchlistCt = state.watchlistObj.length;
    },
    clearList(state) {
      state.watchlistObj = [];
      state.watchlistCt = 0;
    },
  },
});

export const {
  setWatchlistObj,
  setWatchlistCt,
  remove,
  clearList,
  setIsWatchlisted,
} = watchlistSlice.actions;
export default watchlistSlice.reducer;
