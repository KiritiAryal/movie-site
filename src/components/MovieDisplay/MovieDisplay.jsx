import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, FormControl, TextField } from "@mui/material";
import "./MovieDisplay.css";
const API_KEY = "d6278b3dc3e6f8f8376a89851c3f8c8f";
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

export default function MovieDisplay() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
    }
  };

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
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
              <MovieCard key={movie.id} {...movie} />
            </div>
          );
        })}
      </Box>
    </>
  );
}
