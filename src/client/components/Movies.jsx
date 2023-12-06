import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

let API = 'http://localhost:3000/api'


function Movies() {
 
  const [searchMovie, setSearchMovie] = useState("");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();

  }, [])

  async function fetchMovies() {
    try {
      //  fix this const data = movies make array obj of movies
     
      const { data } = await Axios.get(`${API}/movies`);

      


      setMovies(data.movies);

    } catch (error) {
      console.error('Error fetching movies:', error.message);
      
    }
    
    
  }

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
  

  return (
    <>
      <div className='movies-container'>
        <h2>Popular Movies</h2>
        <input 
         className="search-bar"
          type="text"
          placeholder="Search by movie title or director..."
          value={searchMovie}
          onChange={handleInputChange}
        />
        {
          movies.length ? (
            filterMovie().map((movie) => {
              return <div key={movie.id}>
                <Link className="details-link" to={`/details/${movie.id}`}>
  <img src={movie.img} alt={movie.title} />
</Link>
              </div>
            })
            )  :
            <h2>Loading...</h2>
        }
      </div>
    
    </>
  );

}



export default Movies