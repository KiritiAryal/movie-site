import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import Login from "../components/Login/Login";

import Signup from "../components/Signup/Signup";
import Header from "../components/Header/Header";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import HeroSection from "../components/HeroSection/HeroSection";
import Watchlist from "../components/Watchlist/Watchlist";
const AppRouter = () => {
  const { currentUser } = useContext(AuthContext);
  function PrivateRouter() {
    let location = useLocation();
    if (!currentUser) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
  }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route element={<PrivateRouter />}>
          <Route path="/watchlist" element={<Watchlist />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
