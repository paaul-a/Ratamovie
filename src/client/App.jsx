import { useState } from 'react';
import Navigate from './components/Navigate';
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login';
import Movies from './components/Movies';
import SingleMovie from './components/SingleMovie';
import Register from './components/Register';
import Account from './components/Account';


function App() {
  const [ token, setToken ] = useState(null);
  const [myReviews, setMyReviews] = useState([]);
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
      <div className='welcome'>
        <h1>Welcome to RataMovie! A place to review and rate your favorite movies</h1>
         
        <button className="welcome-button">Sign In or Become a Rat</button>
      </div>
      
        <nav className="navbar">
          <div className="site-name">RataMovie</div>
          <Link className="nav-link" to="/movies">
            Movies
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/account">
            User
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
      <Route path='/movies/:id' element={<SingleMovie token={token} setMyReviews={setMyReviews}/>} />
      <Route path="/login" element={<Login token={token} setToken={setToken}/>}/>
      <Route path="/register" element={<Register token={token} setToken={setToken}/>}/>
      <Route path="/account" element={<Account token={token} setToken={setToken} myReviews={myReviews}/>}/>
    </Routes>
    </>
  );
  
}

// function App() {
//   const [count, setCount] = useState(0);
//   const [ token, setToken ] = useState(null);

//   return (
//   <> 
//     <Navigate/>
//    <div className="site-header">
//         <nav className="navbar">
//           <div className="site-name">RataMovie</div>
//           <Link className="nav-link" to="/movies">
//             Movies
//           </Link>
//           <Link className="nav-link" to="/login">
//             Login/Signup
//           </Link>
//           <Link className="nav-link" to="/account">
//             User Name
//           </Link>
//         </nav>
//     </div>

//     <Routes> 
//       <Route path="/movies" element={<Movies/>}/>
//       <Route path='/movies/:id' element={<SingleMovie/>} />
//       <Route path="/login" element={<Login/>}/>
//     </Routes>

//     <Routes>
//       <Route path="/register" element={<Register token={token} setToken={setToken}/>}/>
//     </Routes>
    
   
//     </>
//   );
  
// }

export default App;
