import { collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";

import AuthContextProvider from "./context/AuthContext";

import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </div>
  );
}

export default App;
