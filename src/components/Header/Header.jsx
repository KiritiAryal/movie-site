import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { AuthContext } from "../../context/AuthContext";
import { logOut } from "../../auth/firebase";
import { Link, useNavigate } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import React, { useContext, useState } from "react";
import "./Header.css";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
        Blockbuster
      </Typography>

      {currentUser ? (
        <>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="avatar-icon"
              src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
            />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5">
                    {currentUser?.displayName}
                  </Typography>
                  <Typography variant="body2">{currentUser?.email}</Typography>
                </Box>
                <Button
                  onClick={() => {
                    navigate("/watchlist");
                    window.location.reload(true);
                  }}
                >
                  <Typography textAlign="center">Watchlist</Typography>
                </Button>
                <Button
                  onClick={() => {
                    logOut();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </Button>
              </Box>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button color="white" onClick={() => navigate("/login")}>
          <Typography variant="h6">
            <FaUser size={15} className="user-logo" />
            Login
          </Typography>
        </Button>
      )}
    </div>
  );
}
