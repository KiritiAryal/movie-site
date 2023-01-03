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
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import VideoSection from "../VideoSection/VideoSection";
import "./MovieDetail.css";
import { BsPlus } from "react-icons/bs";
import defaultImage from "../../assets/mov.avif";

import Rating from "@mui/material/Rating";
import {
  baseImageUrl,
  getCredits,
  getMovieDetails,
  getVideos,
} from "../../features/displayMovies/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addWatchlistCt,
  setWatchlistCt,
  setWatchlistObj,
} from "../../features/watchlist/watchlistSlice";

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
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  let navigate = useNavigate();
  const { movieDetails, videoKey, actors } = useSelector(
    (store) => store.movies
  );
  const { movieId } = useSelector((store) => store.watchlist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetails(id));
    dispatch(getVideos(id));
    dispatch(getCredits(id));
  }, []);

  const img_src = movieDetails?.poster_path
    ? baseImageUrl + movieDetails?.poster_path
    : defaultImage;

  const stars = (movieDetails?.vote_average / 10) * 5;
  const three_leads = actors?.slice(0, 3);
  function handleClick() {
    dispatch(
      setWatchlistObj([
        {
          id: id,
          title: movieDetails?.title,
          overview: movieDetails?.overview,
          release_date: movieDetails?.release_date,
          runtime: movieDetails?.runtime,
          actors: three_leads,
          img: img_src,
        },
      ])
    );
    dispatch(addWatchlistCt(1));
  }
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
            {/* <ListItem>
              <ListItemText
                primary={
                  "Genre: " + `${genre?.slice(0, 5).map((g) => " " + g.name)}`
                }
              />
            </ListItem> */}
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
                  currentUser ? handleClick() : navigate("/login")
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
