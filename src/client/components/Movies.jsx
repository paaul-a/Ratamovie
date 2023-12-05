import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios' // check bookBuddy if there is more you have to do for importing axios

let API = 'http://localhost:3000/api'


function Movies() {
  const [ movies, setMovies ] = useState({});
  const [ searchMovie, setSearchMovie ] = useState ("");

  useEffect(() => {
    fetchMovies();

  }, [])

  async function fetchMovies() {
    try {
      const { data } = await Axios.get(`${API}/movies`)
      setMovies(data.movies);

    } catch(error) {
      console.error(err.message)
    }
  }

  const handleInputChange = (e) => {
    setSearchMovie(e.target.value);
  };

  const filterMovie = () => {
    return movies.filter(
      (movie) =>
      movie.title.toLowerCase().includes(searchMovie.toLowerCase()) ||
      movies.director.toLowerCase().includes(searchMovie.toLocaleLowerCase())
    );
  };

  return (
    <>
      <div className='movies-container'>
        <h2>Popular Movies</h2>
        <input 
          className="search=bar"
          type="text"
          placeholder="Search by movie title or director..."
          value={searchMovie}
          onChange={handleInputChange}
        />
        {
          movies.length ?
            filterMovie().map((movie) => {
              return <div key={movie.id}>
                <Link className="details-link" to={`/details/${movie.id}`}>{movie.img}</Link>
                {/* display movie image in a card that hover highlights to link to movie details page */}
              </div>
            })
            :
            <h2>Loading...</h2>
        }
      </div>
    
    </>
  );

}



export default Movies