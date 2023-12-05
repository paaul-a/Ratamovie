
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function SingleMovie({id, token}){
  const [movie, setMovie ] = useState({});
  const [review, setReviews] =useState([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [newReview, setNewReview] = useState('');

  // const { id } = useParams();
  // let API = //INPUT DATABASE

  useEffect(() => {
    const fetchMovie = async () => {
      try{
        const { data } = await axios.get(`${API}/movies/${id}`);
        setMovie(data);
      } catch (error){
        console.error('Error fetching movie details: ', error.message);
      }
    };
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`${API}/movies/${id}/reviews`);
        setReviews(data);
      } catch (error){
        console.error('Error fetching reviews: ', error.message);
      }
    };
    fetchMovie();
    fetchReviews();
  }, [id]);

  async function handleReview() {
    try{
      await axios.post(
        `${API}/movies/${id}/reviews`,
        {review: newReview},
        {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Review submitted successfully!');
      const { data } = await axios.get(`${API}/movies/${id}/reviews`);
      setReviews(data);
      setNewReview('');
      setIsReviewing(false);
    } catch (error){
      console.error('Error submitting review: ', error.message);
    }
  };

  const openReviewModal = () => {
    if (token){
      setIsReviewing(true);
    } else {
      console.log('You need to be logged in to write a review.');
    }
  };

  const closeReviewModal = () => {
    setIsReviewing(false);
    setNewReview('');
  };

  return (
    <div className='details'>
      {movie.id ? (
        <div className='singleMovie'>
          <h2>{movie.title}</h2> 
          <h3>{movie.director}</h3>   
          <img src={movie.image}/>
          <h4>{movie.description}</h4>
          <h3>{movie.year}</h3>    
          <h3>Reviews</h3>
          {setReviews.map((review) =>(
            <div key={review.id}>
              <p>{review.text}</p>
              <p> Rating: {review.rating}</p>
              </div>
          ))}
          {token && (
            <>
            <button onClick={openReviewModal}>Write a Review</button>
            {isReviewing && (
              <div className='modal'>
                <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)} placeholder='Write your review here.....'/>
                <button onClick={handleReview}>Submit Review</button>
                <button onClick={closeReviewModal}>Cancel</button>
              </div>
            )}
            </>
          )}
    </div>
      ):(
        <h2>We are sorry! No movie was found with this id: {id}. Please try again</h2>
      )}
      </div>
  );

}
export default SingleMovie;
