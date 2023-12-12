import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";



// eslint-disable-next-line react/prop-types
function Account({ token }) {
  const [userData, setUserData] = useState({});
  const [reviewedMovies, setReviewedMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({})
  let API = "http://localhost:3000/api"

  const { id } = useParams();
  useEffect(() =>{
    fetchAccount(id);
    fetchMovieDetails();
  
    //fetchReviewedMovies();
  }, [id]);
  
  // async function fetchAccount(userId){
  //     if (token){
  //       console.log('token:', token)

  //       try{ 
  //         const response = await fetch (`${API}/users/me/${userId}`,
  //         {
  //         headers:{
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`
  //         },
  //       });
  //       const result = await response.json();
  //       console.log("account result 2:", result)
  //       setUserData(result);
  //     }catch(error){
  //       console.error(error.message)
  //     }
  //   }else{
  //     console.log("Sorry, you are not logged in!")
      
  //   }
  // }
  
  async function fetchAccount(){
    if (token){
      try{
        const response = await fetch(`${API}/reviews/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();
      
        console.log("user reviews:", result)
        setUserData(result)
        setReviewedMovies(result.reviews);
      } catch(error) {
        console.error(error.message);
      }
    }
  }

  async function fetchMovieDetails(id) {
    try {
      const { data } = await axios.get(`${API}/movies/${id}`);
      console.log("movie details in account:", data);
      return data
      //setMovieDetails(data);
    } catch (err) {
      console.error("Error fetching movie details:", err.message);
    }
  }

  // async function fetchMovieDetails(movieId) {
  //   try {
  //     const response = await fetch(`${API}/movies/${movieId}`);
  //     const result = await response.json();
  //     return result;
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  async function handleEditProfile() {
    try{
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
      if (response.ok){
        fetchAccount();
        setNewUsername('');
        setNewPassword('');
        setEditProfileMode(false);
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error){
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
              {reviewedMovies.map(async (review) => {
                const movieDetails = await fetchMovieDetails(review.movieId);
                return (
                  <div key={review.id}>
                    <p>Movie Title: {movieDetails.title}</p>
                    <p>Movie Image: <img src={movieDetails.image} alt={movieDetails.title} /></p>
                    <p>Rating: {review.rating}</p>
                    <p>Content: {review.content}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
            {/* Rest of the code */}
          </div>
        ) : (
          <h3>Sorry! You are not logged in! Please login or register to see this page!</h3>
        )}
      </div>
    </>
  );
  
}

export default Account