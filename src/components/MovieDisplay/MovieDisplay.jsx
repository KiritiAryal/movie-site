import React, { useRef } from "react";
import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Box } from "@mui/system";
import "./MovieDisplay.css";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  getPopular,
  search,
  setIsLoadMoreAvailable,
  setPage,
  setSearchTerm,
  getUpcoming,
  addPage,
  getTopRated,
  clearMovies,
} from "../../features/displayMovies/moviesSlice";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const pageTypeMap = {
  Popular: getPopular,
  "Top-Rated": getTopRated,
  Upcoming: getUpcoming,
};

const useStyles = makeStyles((theme) => ({
  hidePadding: {
    "& .MuiSelect-outlined": {
      paddingBottom: "20px",
    },
  },
}));
export default function MovieDisplay() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = React.useState("");
  const classes = useStyles();

  const [pageType, setPageType] = useState(Object.keys(pageTypeMap)[0]);
  const { movies, searchTerm, page, isLoadMoreAvailable, totalPages } =
    useSelector((store) => store.movies);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      dispatch(search(searchTerm));
    }
  };
  useEffect(() => {
    function callAPI() {
      dispatch(pageTypeMap[pageType]());
      setPage(1);
    }
    callAPI();
  }, [pageType]);

  useEffect(() => {
    function callAPI() {
      dispatch(pageTypeMap[pageType](page));

      if (totalPages > page) {
        dispatch(setIsLoadMoreAvailable(true));
      }
    }
    callAPI();
  }, [page]);

  useEffect(() => {
    function handleScrollEvent() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        isLoadMoreAvailable
      ) {
        dispatch(addPage(1));
      }
    }

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [page]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <form className="search" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <Button variant="contained" size="large" className="button">
          Search
        </Button>
      </form>

      <div className="sort">
        <Select
          open={open}
          onClick={(event) => {
            setOpen(!open);
            event.preventDefault();
          }}
          displayEmpty
          value=""
          label="sort"
          variant="outlined"
          classes={{
            outlined: classes.hideIconPadding,
            icon: classes.hideIcon,
          }}
          renderValue={(_selected) => "Sort By"}
        >
          {Object.keys(pageTypeMap).map((item, i = 1) => {
            return (
              <MenuItem
                key={i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(clearMovies());
                  setPageType(item);
                }}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <Box
        sx={{
          margin: "5%",
          marginTop: "0.1%",
          gap: 5,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <MovieCard {...movie} />
            </div>
          );
        })}
      </Box>
    </Box>
  );
}
