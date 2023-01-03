import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
export const baseImageUrl = "https://image.tmdb.org/t/p/w1280";

export const getPopular = createAsyncThunk(
  "movies/getPopular",
  async (page = 1, thunkApi) => {
    try {
      const {
        data: { results },
        data: { total_pages },
      } = await axios(`${API_URL + "/movie/popular"}`, {
        params: {
          api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
          page,
        },
      });

      return { results, total_pages };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
export const getTopRated = createAsyncThunk(
  "movies/getTopRated",
  async (page = 1, thunkApi) => {
    try {
      const {
        data: { results },
        data: { total_pages },
      } = await axios(`${API_URL + "/movie/top_rated"}`, {
        params: {
          api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
          page,
        },
      });
      return { results, total_pages };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getUpcoming = createAsyncThunk(
  "movies/getUpcoming",
  async (page = 1, thunkApi) => {
    try {
      const {
        data: { results },
        data: { total_pages },
      } = await axios(`${API_URL + "/movie/upcoming"}`, {
        params: {
          api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
          page,
        },
      });
      return { results, total_pages };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const search = createAsyncThunk(
  "movies/search",
  async (query, thunkApi) => {
    try {
      const {
        data: { results },
      } = await axios(`${API_URL + "/search/movie"}`, {
        params: {
          api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
          query,
        },
      });
      return results;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getVideos = createAsyncThunk(
  "movies/getVideos",
  async (id, thunkApi) => {
    try {
      const type = `/movie/${id}/videos`;
      const { data } = await axios.get(`${API_URL + type}`, {
        params: {
          api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
        },
      });
      return data.results[0].key;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
export const getMovieDetails = createAsyncThunk(
  "movies/getMovieDetails",
  async (id, thunkApi) => {
    const type = `/movie/${id}`;
    const { data } = await axios.get(`${API_URL + type}`, {
      params: {
        api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
      },
    });
    return data;
  }
);

export const getCredits = createAsyncThunk(
  "movies/getCredits",
  async (id, thunkApi) => {
    const type = `/movie/${id}/credits`;
    const { data } = await axios.get(`${API_URL + type}`, {
      params: {
        api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
      },
    });
    return data;
  }
);

const initialState = {
  movies: [],
  searchTerm: "",
  page: 1,
  isLoading: true,
  isLoadMoreAvailable: true,
  movieDetails: [],
  videoKey: null,
  actors: [],
};
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setId(state, { payload }) {
      state.id = payload;
    },
    setSearchTerm(state, { payload }) {
      state.searchTerm = payload;
    },
    setSearchResults(state, { payload }) {
      state.movies = payload;
    },
    clearMovies(state) {
      state.movies = [];
    },
    setIsLoadMoreAvailable(state, { payload }) {
      state.isLoadMoreAvailable = payload;
    },
    setPage(state, { payload }) {
      state.page = payload;
    },
    addPage(state, { payload }) {
      state.page = state.page + payload;
    },
  },
  extraReducers: {
    [getPopular.pending]: (state) => {
      state.isLoading = true;
    },
    [getPopular.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const data = [...state.movies, ...payload.results];
      let unique = data.filter(
        ({ id }, i) => i === data.findIndex(({ id: _id }) => id === _id)
      );
      state.movies = unique;
      state.totalPages = payload.total_pages;
    },
    [getPopular.rejected]: (state) => {
      state.isLoading = false;
    },
    [getTopRated.pending]: (state) => {
      state.isLoading = true;
    },
    [getTopRated.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const data = [...state.movies, ...payload.results];
      let unique = data.filter(
        ({ id }, i) => i === data.findIndex(({ id: _id }) => id === _id)
      );
      state.movies = unique;
      state.totalPages = payload.total_pages;
    },
    [getTopRated.rejected]: (state) => {
      state.isLoading = false;
    },
    [getUpcoming.pending]: (state) => {
      state.isLoading = true;
    },
    [getUpcoming.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const data = [...state.movies, ...payload.results];
      let unique = data.filter(
        ({ id }, i) => i === data.findIndex(({ id: _id }) => id === _id)
      );
      state.movies = unique;
      state.totalPages = payload.total_pages;
    },
    [getUpcoming.rejected]: (state) => {
      state.isLoading = false;
    },
    [search.pending]: (state) => {
      state.isLoading = true;
    },
    [search.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
    },
    [search.rejected]: (state) => {
      state.isLoading = false;
    },
    [getVideos.pending]: (state) => {
      state.isLoading = true;
    },
    [getVideos.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.videoKey = action.payload;
    },
    [getVideos.rejected]: (state) => {
      state.isLoading = false;
    },
    [getMovieDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovieDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movieDetails = action.payload;
    },
    [getMovieDetails.rejected]: (state) => {
      state.isLoading = false;
    },
    [getCredits.pending]: (state) => {
      state.isLoading = true;
    },
    [getCredits.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.actors = action.payload.cast;
    },
    [getCredits.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const {
  setSearchTerm,
  clearMovies,
  setIsLoadMoreAvailable,
  setPage,
  addPage,
  setSearchResults,
} = moviesSlice.actions;
export default moviesSlice.reducer;
