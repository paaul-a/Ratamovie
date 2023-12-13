import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import Axios from "axios";

let API = "http://localhost:3000/api";

function Movies() {
  const [searchMovie, setSearchMovie] = useState("");

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();
  const backdropImageUrl =
    "https://imageio.forbes.com/specials-images/imageserve/6547cda2049eb16a6a4f08a1/-Saltburn--movie-poster/0x0.jpg?format=jpg&crop=1944,1093,x0,y809,safe&width=960";

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      const { data } = await Axios.get(`${API}/movies`);
      // console.log(data.movies)
      setMovies(data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  }

  const handleClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const handleInputChange = (e) => {
    setSearchMovie(e.target.value);
  };

  const filterMovie = () => {
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchMovie.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchMovie.toLowerCase())
    );
  };

  // return (
  //   <>
  //     <div className="site-header">
  //       <div className="welcome">
  //         <h1>
  //           Welcome to RataMovie! A place to review and rate your favorite
  //           movies
  //         </h1>
  //         <button className="welcome-button">Sign In or Become a Rat</button>
  //       </div>
  //     </div>

  //     <div className="app">
  //       <div className="popular">
  //         <h3>POPULAR MOVIES</h3>
  //         <div className="search-bar">
  //         <input
  //           className="search-bar"
  //           type="text"
  //           placeholder="Search movies..."
  //           value={searchMovie}
  //           onChange={handleInputChange}
  //         />
  //         <hr />
  //       </div>

       
  //         <div className="movies-container">
  //           {movies.length ? (
  //             filterMovie().map((movie) => (
  //               <div key={movie.id} className="movie-card">
  //                 <img
  //                   src={movie.image}
  //                   onClick={() => handleClick(movie.id)}
  //                   alt={movie.title}
  //                 />
  //                 <div className="movie-info">
  //                   <h2>{movie.title}</h2>
  //                 </div>
  //               </div>
  //             ))
  //           ) : (
  //             <h2>Loading...</h2>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      <div className="site-header">
        <div className="welcome">
          <h1>
            Welcome to RataMovie! A place to review and rate your favorite movies
          </h1>
          <button className="welcome-button">Sign In or Become a Rat</button>
        </div>
      </div>
      <div className="app">

      <div className="popular-container">
        <h3>POPULAR MOVIES</h3>
        <div className="search-bar">
          <input
            className="search-bar-input"

        <div className='popular'>
          <h3>POPULAR MOVIES</h3>
          <hr />
        </div>
        <div className='movies-container'>
      
          <input 
            className="search-bar"

            type="text"
            placeholder="Search movies..."
            value={searchMovie}
            onChange={handleInputChange}
          />

        </div>
      </div>
      <hr className="popular-hr" />
  
        <div className="movies-container">
          {movies.length ? (
            filterMovie().map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={movie.image}
                  onClick={() => handleClick(movie.id)}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h2>{movie.title}</h2>

          {
            movies.length ? (
              filterMovie().map((movie) => {
                return <div key={movie.id} className="movie-card">
                  <img src={movie.image} onClick={() => handleClick(movie.id)} alt={movie.title} />
                  <div className="movie-info">
                    <h2>{movie.title}</h2>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </>
  );
  
}

export default Movies;
