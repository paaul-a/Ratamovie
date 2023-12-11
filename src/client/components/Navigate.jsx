import { useState } from 'react';
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Login from './Login';
import Movies from './Movies';
import SingleMovie from './SingleMovie';
import Register from './Register';


function Navigate() {
  const [ token, setToken ] = useState(null);
  const [searchMovie, setSearchMovie] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchMovie(e.target.value);
  };

  const handleSearch = () => {
    // Navigate to the Movies page with the search query
    navigate(`/movies?search=${encodeURIComponent(searchMovie)}`);
  };

  return (
  <> 
   <div className="site-header">
        <nav className="navbar">
          <div className="site-name">RataMovie</div>
          <Link className="nav-link" to="/movies">
            Movies
          </Link>
          <Link className="nav-link" to="/login">
            Login/Signup
          </Link>
          <Link className="nav-link" to="/account">
            User Name
          </Link>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchMovie}
                onChange={handleInputChange}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
        </nav>
    </div>

    <Routes> 
      <Route path="/movies" element={<Movies/>}/>
      <Route path='/movies/:id' element={<SingleMovie/>} />
      <Route path="/login" element={<Login token={token} setToken={setToken}/>}/>
      <Route path="/register" element={<Register token={token} setToken={setToken}/>}/>
    </Routes>
    </>
  );
  
}

export default Navigate;
