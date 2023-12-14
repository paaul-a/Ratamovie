import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Account({ token }) {
  const [userData, setUserData] = useState({});
  const [reviewedMovies, setReviewedMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({})
  let API = "http://localhost:3000/api"

  const { id } = useParams();
  useEffect(() => {
    fetchAccount(id);

  }, [id]);

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
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async function fetchMovieDetails() {
    try {
      const { data } = await axios.get(`${API}/movies/${id}`);
      //console.log("movie details in account:", data);
      return data
      //setMovieDetails(data);
    } catch (err) {
      console.error("Error fetching movie details:", err.message);
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


  return (
    <>
      <div>
        {token ? (
          <div className="account-container">
            <div className="user-info">
              <h2>{userData.name}</h2>
              <p>{userData.email}</p>
              <button>Edit Profile</button>
            </div>
            <div className="account-reviews">
              <h3>Reviews</h3>
              <hr />
              {reviewedMovies.map((review) => (
                <div key={review.id}>
                  <p>Movie: {review.movieId}</p>
                  <p>
                    <StarRating rating={review.rating} />
                  </p>                  
                  <p>Content: {review.content}</p>
                  <hr />
                </div>
              ))}
            </div>

          </div>
        ) : (
          <h3>Sorry! You are not logged in! Please login or register to see this page!</h3>
        )}
      </div>

    </>
  );

}

export default Account