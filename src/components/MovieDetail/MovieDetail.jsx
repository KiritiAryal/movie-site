import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import VideoSection from "../VideoSection/VideoSection";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [videoKey, setVideoKey] = useState();
  let navigate = useNavigate();

  const API_KEY = "d6278b3dc3e6f8f8376a89851c3f8c8f";
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((err) => console.log(err));
  }, [movieDetailBaseUrl, videoUrl]);

  const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF",
    },
  })(Typography);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "50px",
        height: "100%",
        paddingBottom: "50px",
      }}
    >
      {videoKey && <VideoSection videoKey={videoKey} />}
      <WhiteTextTypography
        variant="h4"
        sx={{ position: "relative", top: "25px" }}
      >
        {movieDetails?.title}
      </WhiteTextTypography>
      <Card
        sx={{
          width: "70vw",
          backgroundColor: "#f2f2f2",
          display: "flex",
          marginTop: "50px",
        }}
      >
        <div className="img-container">
          <img
            className="img"
            src={
              movieDetails?.poster_path
                ? baseImageUrl + movieDetails?.poster_path
                : defaultImage
            }
            alt={movieDetails?.title}
          />
        </div>

        <Card sx={{}}>
          <CardContent>
            <p className="overview">{movieDetails?.overview}</p>
          </CardContent>
          <List className="overview">
            <ListItem>
              <ListItemText
                primary={"Release Date : " + movieDetails?.release_date}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={"Rate : " + movieDetails?.vote_average} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Total Vote : " + movieDetails?.vote_count}
              />
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                onClick={() =>
                  currentUser ? navigate("/cart") : navigate("/login")
                }
              >
                Add to Watchlist
              </Button>
            </ListItem>
            <ListItem sx={{ paddingTop: "80px", bottom: 0 }}>
              <Link to={-1}>
                <Button>More Movies</Button>
              </Link>
            </ListItem>
          </List>
        </Card>
      </Card>
    </Box>
  );
};

export default MovieDetail;
