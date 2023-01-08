import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
// import { db } from "./auth/firebase";

// import AuthContextProvider, { AuthContext } from "./context/AuthContext";

import AppRouter from "./router/AppRouter";
// import {
//   remove,
//   clearList,
//   setWatchlistObj,
//   setWatchlistCt,
// } from "../features/watchlist/watchlistSlice";
import { useDispatch } from "react-redux";
import { AuthContext } from "./context/AuthContext";
import {
  setWatchlistCt,
  setWatchlistObj,
} from "./features/watchlist/watchlistSlice";
import { db } from "./auth/firebase";

function App() {
  // const { currentUser } = useContext(AuthContext);
  // const dispatch = useDispatch();
  // let data = null;
  // useEffect(() => {
  //   (async () => {
  //     const moviesRef = doc(db, currentUser?.email, "watchlist");
  //     const docSnap = await getDoc(moviesRef);

  //     if (docSnap.exists()) {
  //       data = docSnap.data();
  //       data = Object.values(data);
  //       dispatch(setWatchlistObj(...data));
  //       dispatch(setWatchlistCt());
  //     } else {
  //       console.log("No such document!");
  //     }
  //   })();
  // }, []);
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
