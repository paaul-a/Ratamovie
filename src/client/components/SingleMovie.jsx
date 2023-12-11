import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

let API = "http://localhost:3000/api";

const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

const StarRating = ({ rating, onClick, starColor = "#D9AC25", emptyStarColor = "rgb(30, 30, 30)", starSize="1x"}) => {
  const stars = Array.from({length: 5}, (_, index) => (
    <FontAwesomeIcon
      icon={faStar}
      key={index}
      color={index < rating ? starColor : emptyStarColor}
      onClick={() => onClick(index + 1)}
      style={{fontsize: starSize}}

    />
  ));

  return <div>{stars}</div>;
};


// eslint-disable-next-line react/prop-types
function SingleMovie({token, setMyReviews}) {
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchMovie();
    fetchReviews();
  }, [id]);

  async function fetchMovie() {
    try {
      const { data } = await axios.get(`${API}/movies/${id}`);
      setMovie(data);
    } catch (err) {
      console.error("Error fetching movie details:", err.message);
    }
  }

  async function fetchReviews() {
    try {
      const { data } = await axios.get(`${API}/reviews/${id}`);
      // console.log('Server response:', data);
      setReviews(data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err.message);
    }
  }

  async function handleReview(event) {
    event.preventDefault()
    try {
      const response = await fetch(`${API}/movies/${id}/reviews`,{
        method: "POST",
          // {review: newReview, rating: userRating}, //check backend inputs in the database so they match
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            review: newReview,
            rating: userRating
          })
        });
      console.log("Review submitted successfully!");
      // const { data } = await axios.get(`${API}/movies/${id}/reviews`);
      const result = await response.json()
      console.log("handleReview result in singleMovie:", result)
      setReviews(result);
      setMyReviews(result)
      setNewReview("");
      setUserRating(0);
      
      // setIsReviewing(false);
    } catch (error) {
      console.error("Error submitting review: ", error.message);
    }
  }


  const averageRating = calculateAverageRating(reviews);

  const handleStarClick = (selectedRating) => {
    setUserRating(selectedRating);
    console.log(`User clicked on star ${selectedRating}`);
  };

  return (
    <>
      <div className="details">
        {movie.id ? (
          <div className="singleMovie">
            <div className="movie-poster">
              <img src={movie.image} alt={movie.title} />
              {/* <div className="average-rating">
                <p>RATINGS</p>
                <StarRating rating={averageRating} />
              </div> */}
            </div>

            <div className="movie-title">
              <h2>{movie.title}</h2>
              <p>
                {movie.year} Directed by {movie.director}
              </p>
            </div>

            <div className="movie-des">
              <p>{movie.description}</p>
            </div>

            <div className="movie-reviews">
              <h3>REVIEWS</h3>
              <hr />
              {reviews.map((review) => (
                <div className="reviews" key={review.id}>
                  <p>
                    Review by {review.name} <StarRating rating={review.rating} />
                  </p>
                  <p>{review.content}</p>
                  <hr />
                </div>
              ))}

              <div className="user-review">
                <p>Rate</p>
                <StarRating className="star-rating" rating={userRating} onClick={handleStarClick} starSize="3x"/>
                
                <h5>Review Movie</h5> 
                <hr />
                <form onSubmit={handleReview} className="review-form">
                  <input className="review-input" type="text" name="review" placeholder="Add a review..."></input>
                  <button className="save-button" type="submit">SAVE</button>
                </form>

              </div>
            </div>
          </div>
        ) : (
          <h2>
            We are sorry! No movie was found with this id: {id}. Please try again
          </h2>
        )}
      </div>
    </>   
  );
}
export default SingleMovie;
