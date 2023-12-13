import { useState } from 'react';
import Navigate from './components/Navigate';
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Login from './components/Login';
import Movies from './components/Movies';
import SingleMovie from './components/SingleMovie';
import Register from './components/Register';
import Account from './components/Account';


function App() {
  const [ token, setToken ] = useState(null);
  const [myReviews, setMyReviews] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const {id} = useParams();


  // // const handleInputChange = (e) => {
  // //   setSearchMovie(e.target.value);
  // // };

  // // const handleSearch = () => {
  // //   // Navigate to the Movies page with the search query
  // //   navigate(`/movies?search=${encodeURIComponent(searchMovie)}`);
  // };

  return (
  <> 
   <div className="App">
        <nav className="navbar">
          <div className="site-name">RataMovie</div>
          <Link className="nav-link" to="/movies">
            Movies
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>

          {token ? (
            <Link className="nav-link" to={`/users/${userId}`}>
              User
            </Link>
          ) : null}
           

          {/* <Link className="nav-link" to={`/users/${userId}`}>
            User
          </Link> */}
            {/* <div className="search-bar">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchMovie}
                onChange={handleInputChange}
              />
              <button onClick={handleSearch}>Search</button>
            </div> */}

        </nav>
    </div>

    <Routes> 
      <Route path="/movies" element={<Movies/>}/>
      <Route path='/movies/:id' element={<SingleMovie token={token} userId={userId} setUserId={setUserId} setMyReviews={setMyReviews}/>} />
      <Route path="/login" element={<Login userId={userId} setUserId={setUserId} token={token} setToken={setToken}/>}/>
      <Route path="/register" element={<Register token={token} setToken={setToken}/>}/>
      <Route path="/users/:userId" element={<Account userId={userId} setUserId={setUserId} token={token} setToken={setToken} myReviews={myReviews}/>}/>
    </Routes>
    </>


    
  );
  
}
 {/* <div className="search-bar">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchMovie}
                onChange={handleInputChange}
              />
              <button onClick={handleSearch}>Search</button>
            </div> */}

  //);
  




export default App;
