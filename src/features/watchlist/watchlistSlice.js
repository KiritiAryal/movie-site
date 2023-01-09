import { createSlice } from "@reduxjs/toolkit";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";

export const updatelist = async (arr, email) => {
  try {
    await updateDoc(doc(db, email, "watchlist"), {
      array: arr,
    });
  } catch (error) {}
};
export const setList = async (object, email) => {
  try {
    await setDoc(doc(db, email, "watchlist"), object);
  } catch (error) {}
};

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
    },
    setWatchlistCt(state) {
      state.watchlistCt = state.watchlistObj.length;
    },
    remove(state, { payload }) {
      const { id, email } = payload;
      state.watchlistObj = state.watchlistObj.filter((item) => item.id !== id);
      state.watchlistCt = state.watchlistObj.length;
      updatelist([...state.watchlistObj], email);
    },
    clearList(state, { payload }) {
      state.watchlistObj = [];
      state.watchlistCt = 0;
      updatelist([...state.watchlistObj], payload);
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
