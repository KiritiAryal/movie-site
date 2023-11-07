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
import WatchlistDisplay from "../components/WatchlistDisplay/WatchlistDisplay";
const AppRouter = () => {
  const { currentUser } = useContext(AuthContext);
  function PrivateRouter() {
    const location = useLocation();
    if (currentUser === false) {
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
          <Route path="/watchlist" element={<WatchlistDisplay />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
