import { Card } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import "./Watchlist.css";
function Watchlist() {
  const { watchlistCt, watchlistObj } = useSelector((store) => store.watchlist);
  return (
    <Card
      className="movie"
      sx={{
        backgroundColor: "#f2f2f2",
        borderRadius: "0.2rem",
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        width: "60vw",
        height: "850px",
        position: "absolute",
        left: "30%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          gap: "20px",
        }}
      >
        <h1 className="heading">Your Watchlist</h1>
        <Card
          className="movie"
          sx={{
            borderRadius: "0.5rem",
            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            width: "95%",
            height: "250px",
          }}
        >
          {console.log(watchlistObj)}
          <hr className="line" />
        </Card>
      </Box>
    </Card>
  );
}

export default Watchlist;
