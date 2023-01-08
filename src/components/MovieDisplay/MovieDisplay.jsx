import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Box } from "@mui/system";
import "./MovieDisplay.css";
import { useDispatch, useSelector } from "react-redux";

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
import { Button, Menu } from "@mui/material";

const pageTypeMap = {
  Popular: getPopular,
  "Top-Rated": getTopRated,
  Upcoming: getUpcoming,
};

export default function MovieDisplay() {
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
      <form className="search" on onSubmit={(e) => handleSubmit(e)}>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {Object.keys(pageTypeMap).map((item, i = 1) => {
          return (
            <Button
              key={i + 1}
              onClick={() => {
                dispatch(clearMovies());
                setPageType(item);
              }}
              variant="contained"
            >
              {item}
            </Button>
          );
        })}
      </Box>
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
