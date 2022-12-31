import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import axios from "axios";
import { Box } from "@mui/system";
import "./MovieDisplay.css";
import { pageTypeMap } from "../../api";

const API_KEY = "d6278b3dc3e6f8f8376a89851c3f8c8f";
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

export default function MovieDisplay() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageType, setPageType] = useState(Object.keys(pageTypeMap)[0]);
  const [isLoadMoreAvailable, setIsLoadMoreAvailable] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
    }
  };

  useEffect(() => {
    async function callAPI() {
      const { results } = await pageTypeMap[pageType]();

      setMovies(results);
      setPage(1);
    }
    callAPI();
  }, [pageType]);

  useEffect(() => {
    async function callAPI() {
      const { results, totalPages } = await pageTypeMap[pageType](page);
      setIsLoadMoreAvailable(totalPages > page);
      setMovies([...movies, ...results]);
    }
    callAPI();
  }, [page]);

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    function handleScrollEvent() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        isLoadMoreAvailable
      ) {
        setPage(page + 1);
        // here add more items in the 'filteredData' state from the 'allData' state source.
      }
    }

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [page]);

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
      {/* {isLoadMoreAvailable && (
        <button type="button" className="btn-load-more" onScroll={onLoadMore}>
          MORE...
        </button>
      )} */}
    </>
  );
}
