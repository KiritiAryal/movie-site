import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";

export const pageTypeMap = {
  popular: getPopular,
  rated: getRated,
  upcoming: getUpcoming,
};

export async function getPopular(page = 1) {
  const endpoint = "/movie/popular";
  const {
    data: { results },
    data: { total_pages },
  } = await axios.get(`${API_URL + endpoint}`, {
    params: {
      api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
      page,
    },
  });

  return { results, totalPages: total_pages };
}

export async function getRated(page = 1) {
  const endpoint = "/movie/top_rated";
  const {
    data: { results },
    data: { total_pages },
  } = await axios.get(`${API_URL + endpoint}`, {
    params: {
      api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
      page,
    },
  });
  return { results, totalPages: total_pages };
}

export async function getUpcoming(page = 1) {
  const endpoint = "/movie/upcoming";
  const {
    data: { results },
    data: { total_pages },
  } = await axios.get(`${API_URL + endpoint}`, {
    params: {
      api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
      page,
    },
  });
  return { results, totalPages: total_pages };
}
export async function getByName(query) {
  const type = "/search/movie";
  const {
    data: { results },
  } = await axios(`${API_URL + type}`, {
    params: {
      api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
      query,
    },
  });

  return results;
}

export async function getMovieDetails(id) {
  const type = `/movie/${id}`;
  const { data } = await axios.get(`${API_URL + type}`, {
    params: {
      api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
    },
  });
  return data;
}
export async function getVideo(id) {
  const type = `/movie/${id}/videos`;
  const { data } = await axios.get(`${API_URL + type}`, {
    params: {
      api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
    },
  });
  return data;
}

export async function getCredits(id) {
  const type = `/movie/${id}/credits`;
  const { data } = await axios.get(`${API_URL + type}`, {
    params: {
      api_key: "d6278b3dc3e6f8f8376a89851c3f8c8f",
    },
  });
  return data;
}

export const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
