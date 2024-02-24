import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchMovie } from './fetchMovie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Account({ token }) {
  const [userData, setUserData] = useState({});
  const [reviewedMovies, setReviewedMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({})
  const environment = process.env.NODE_ENV || 'development';
  let API = environment == 'production' ? 'https://ratamovie.onrender.com/api' : 'http://localhost:3000/api';


  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    fetchAccount(userId);

  }, [userId]);

  const StarRating = ({
    rating,
    onClick,
    starColor = "#D9AC25",
    emptyStarColor = "rgb(30, 30, 30)",
    starSize = "",
  }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        icon={faStar}
        key={index}
        color={index < rating ? starColor : emptyStarColor}
        onClick={() => onClick(index + 1)}
        style={{ fontsize: starSize }}
      />
    ));

    return <div>{stars}</div>;
  };

  async function fetchAccount() {
    if (token) {
      try {
        const response = await fetch(`${API}/reviews/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();

        setUserData(result)
        setReviewedMovies(result.reviews);

        result.reviews.forEach(review => {
          fetchMovieDetails(review.movieId);
        });

      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async function fetchMovieDetails(movieId) {
    try {
      const movieData = await fetchMovie(movieId)
      console.log("movieData in account:", movieData)
      setMovieDetails(prevDetails => ({ ...prevDetails, [movieId]: movieData }));
    } catch (err) {
      console.log(err)
    }
  }


  async function handleEditProfile() {
    try {
      const response = await fetch(`${API}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newUsername,
          newPassword,
        }),
      });
      if (response.ok) {
        fetchAccount();
        setNewUsername('');
        setNewPassword('');
        setEditProfileMode(false);
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating your profile:', error.message);
    }
  };

  const handleNavLogin = () => {
    navigate(`/login`);
  }

  const handlePosterClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };
  
  // const handleLogout = () => {
  //   // Clear user data and token
  //   setUserData({});
  //   setToken('');
  //   setReviewedMovies([]);

  //   // Navigate to login page
  //   navigate('/login');
  // };


  return (
    <>
      <div>
        {token ? (
          <div className="account-container">
            <div className="user-info">
              <h2>{userData.name}</h2>
              <button>Logout</button>
              <p>{userData.email}</p>
            </div>
            <div className="account-reviews">
              <p>REVIEWS</p>
            </div>
            <div className="account-review-content">
              {reviewedMovies.map((review) => (
                <div key={review.id} className="review-item">
                  {movieDetails[review.movieId] && (
                    <img
                      src={movieDetails[review.movieId].image}
                      alt="Movie Poster"
                      className="review-poster"
                      onClick={() => handlePosterClick(review.movieId)}

                    />
                  )}
                  <div className="review-details">
                    {movieDetails[review.movieId] && (
                      <div className="title-year">
                        <p>
                        <span className="review-title">{movieDetails[review.movieId].title}</span>
                        <span className="year">{movieDetails[review.movieId].year}</span>
                        </p>
                      </div>
                    )}
                    <div className="account-stars">
                      <StarRating rating={review.rating} />
                      <p>{review.content}</p>
                    </div>
                  </div>
                  {/* <hr className="review-separator" /> */}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="account-login-request">
            <button onClick={handleNavLogin} className="account-nav-button">Sorry! You are not logged in! 
            Please login or register to see this page!</button>
          </div>
        )}
      </div>
    </>
  );
  
  
  
}

export default Account