import {
  Alert,
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
import React, { useEffect, useRef } from "react";
import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import VideoSection from "../VideoSection/VideoSection";
import "./MovieDetail.css";
import { BsPlus } from "react-icons/bs";
import defaultImage from "../../assets/mov.avif";
import { MdDone } from "react-icons/md";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../auth/firebase";
import Rating from "@mui/material/Rating";
import {
  baseImageUrl,
  getCredits,
  getMovieDetails,
  getVideos,
} from "../../features/displayMovies/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setList,
  setWatchlistCt,
  updatelist,
} from "../../features/watchlist/watchlistSlice";
import { Stack } from "@mui/system";

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
  const alertRef = useRef();
  const [watchlist, setWatchlist] = useState({});

  const { currentUser } = useContext(AuthContext);
  // const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const email = currentUser?.email;
  const { id } = useParams();

  let navigate = useNavigate();
  const { movieDetails, videoKey, actors } = useSelector(
    (store) => store.movies
  );
  const { watchlistObj } = useSelector((store) => store.watchlist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetails(id));
    dispatch(getVideos(id));
    dispatch(getCredits(id));
  }, []);
  const img_src = movieDetails?.poster_path
    ? baseImageUrl + movieDetails?.poster_path
    : defaultImage;
  // function handleAlertClose() {
  //   setTimer(
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 5000)
  //   );
  // }
  useEffect(() => {
    if (currentUser) {
      onSnapshot(doc(db, email, "watchlist"), (doc) => {
        let data = doc.data();
        setWatchlist(data);
      });
    } else {
    }
  }, []);
  const stars = (movieDetails?.vote_average / 10) * 5;
  const three_leads = actors?.slice(0, 3);
  function handleClick() {
    if (currentUser) {
      (async () => {
        try {
          if (watchlist === undefined) {
            setList(
              {
                array: [
                  {
                    id: id,
                    title: movieDetails?.title,
                    overview: movieDetails?.overview,
                    release_date: movieDetails?.release_date,
                    runtime: movieDetails?.runtime,
                    actors: three_leads,
                    img: img_src,
                    vote: movieDetails?.vote_average,
                  },
                ],
              },
              email
            );
          } else {
            updatelist(
              [
                ...watchlist?.array,
                {
                  id: id,
                  title: movieDetails?.title,
                  overview: movieDetails?.overview,
                  release_date: movieDetails?.release_date,
                  runtime: movieDetails?.runtime,
                  actors: three_leads,
                  img: img_src,
                  vote: movieDetails?.vote_average,
                },
              ],
              email
            );
          }
        } catch (error) {}
      })();
    }
    dispatch(setWatchlistCt());
    setShowAlert(true);
    alertRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "nearest",
      inline: "start",
    });
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
                onClick={() => {
                  currentUser ? handleClick() : navigate("/login");
                }}
              >
                <BsPlus size={20} /> Add to Watchlist
                {/* {isWatchlisted ? (
                  <>
                    <BsPlus size={20} /> Add to Watchlist
                  </>
                ) : (
                  <Box
                    sx={{ display: "flex", gap: "5px", alignItems: "center" }}
                  >
                    <MdDone size={20} /> Is Watchlisted
                  </Box>
                )} */}
              </Button>
            </ListItem>
            <ListItem>
              <Link to={"/"}>
                <Button>Back to Browse</Button>
              </Link>
            </ListItem>
            {/* <ListItem>
              {showAlert && (
                <Stack
                  ref={alertRef}
                  sx={{ margin: "8px", width: "100%" }}
                  spacing={2}
                >
                  <Alert onClose={() => handleAlertClose()}>
                    Added to Watchlist!
                  </Alert>
                </Stack>
              )}
            </ListItem> */}
          </List>
        </Card>
      </Card>
    </Box>
  );
};

export default MovieDetail;
