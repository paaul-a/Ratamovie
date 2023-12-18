import axios from 'axios';
const API = "http://localhost:3000/api";

export async function fetchMovie(movieId) {
  try {
    const { data } = await axios.get(`${API}/movies/${movieId}`);
    return data;
  } catch (err) {
    console.error("Error fetching movie details:", err.message);
    throw err;
  }
}

