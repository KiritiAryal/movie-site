import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import defaultImage from "../../assets/mov.avif";
import "./MovieCard.css";
import GradeIcon from "@mui/icons-material/Grade";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);
export default function MovieCard({
  title,
  poster_path,
  overview,
  vote_average,
  id,
  release_date,
}) {
  let navigate = useNavigate();
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#f2f2f2",
          borderRadius: "0.7rem",
          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          margin: "1rem",
          width: "300px",
          height: "450px",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => navigate("details/" + id)}
      >
        <CardMedia
          component="img"
          height="450px"
          max-width="100%"
          image={poster_path ? IMG_API + poster_path : defaultImage}
          alt={`${title}`}
        />

        <div className="movie-over">
          <h4>{title}</h4>

          <span className="overview-tags">
            <p>
              <GradeIcon
                color="info"
                sx={{ width: "12px", height: "21px", paddingTop: "8px" }}
              />
              {vote_average}
            </p>
            <p className="truncate-year">{release_date}</p>
          </span>

          <p className="overview-text">{overview}</p>
        </div>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <WhiteTextTypography
          variant="h5"
          color="white"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "290px",
          }}
        >
          {title}
        </WhiteTextTypography>
      </Box>
    </>
  );
}
