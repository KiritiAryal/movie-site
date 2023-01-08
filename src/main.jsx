import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import "./index.css";
import { store } from "./store";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
