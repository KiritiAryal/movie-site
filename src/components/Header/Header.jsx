import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { AuthContext } from "../../context/AuthContext";
import { logOut } from "../../auth/firebase";
import { Link, useNavigate } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";

import { useContext } from "react";
import "./Header.css";
import { Box } from "@mui/material";

export default function NavBar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="toolbar">
      <Link to={"/"}>
        <MdLocalMovies size={30} />
      </Link>
      <Typography
        color="#FFF"
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          fontFamily: "Helvetica",
          fontWeight: 500,
        }}
      >
        Gopi Krishna
      </Typography>
      {currentUser ? (
        <Button color="white" onClick={() => logOut()}>
          <Typography variant="h6">Logout</Typography>
        </Button>
      ) : (
        <Button color="white" onClick={() => navigate("/login")}>
          <Typography variant="h6">Login</Typography>
        </Button>
      )}
    </div>
  );
}
