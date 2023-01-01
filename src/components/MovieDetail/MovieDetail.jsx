import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import VideoSection from "../VideoSection/VideoSection";
import "./MovieDetail.css";
import { BsPlus } from "react-icons/bs";
import defaultImage from "../../assets/mov.avif";

import Rating from "@mui/material/Rating";

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
}
const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const MovieDetail = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistCt, setWatchlistCt] = useState();
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [videoKey, setVideoKey] = useState();
  const [genre, setGenre] = useState();
  const [actors, setActors] = useState();
  let navigate = useNavigate();

  const API_KEY = "d6278b3dc3e6f8f8376a89851c3f8c8f";
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const creditUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((err) => console.log(err));
    axios
      .get(genreUrl)
      .then((res) => setGenre(res.data.genres))
      .catch((err) => console.log(err));
    axios
      .get(creditUrl)
      .then((res) => setActors(res.data.cast))
      .catch((err) => console.log(err));
  }, [movieDetailBaseUrl, videoUrl]);

  const img_src = movieDetails?.poster_path
    ? baseImageUrl + movieDetails?.poster_path
    : defaultImage;

  const handleClick = (id) => {
    console.log(id);
  };
  const stars = (movieDetails?.vote_average / 10) * 5;

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
          <img className="img" src={img_src} alt={movieDetails?.title} />
        </div>

        <Card>
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
              <p className="ratings">
                Rating:
                <Rating
                  name="half-rating-read"
                  value={stars}
                  precision={0.5}
                  readOnly
                />
              </p>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Total Vote : " + movieDetails?.vote_count}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Runtime: " + toHoursAndMinutes(movieDetails?.runtime)}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={movieDetails?.adult ? "Rating: 18+" : "Rating: GA"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  "Genre: " + `${genre?.slice(0, 5).map((g) => " " + g.name)}`
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  "Actors: " + `${actors?.slice(0, 6).map((g) => " " + g.name)}`
                }
              />
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                onClick={() =>
                  currentUser ? handleClick(id) : navigate("/login")
                }
              >
                <BsPlus size={20} /> Add to Watchlist
              </Button>
            </ListItem>
            <ListItem>
              <Link to={-1}>
                <Button>Back to Browse</Button>
              </Link>
            </ListItem>
          </List>
        </Card>
      </Card>
    </Box>
  );
};

export default MovieDetail;
