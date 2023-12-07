const express = require('express');
const reviewsRouter = express.Router();
const { requireUser } = require('./utils');



const { 
  getReviewByMovieId,
  getReviewByMovieAndUser,
  createReview,
  getReviewById,
  deleteReview,
} = require('../db/reviews');

reviewsRouter.get('/:movieId', async (req, res, next) => {
  const movieId = req.params.movieId

  try {
    const reviews = await getReviewByMovieId(movieId);
  
    res.send({
      reviews
    });
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get('/:movieId/users/:userId', async (req, res, next) => {
  const {movieId, userId} = req.params;

  try {
    const reviews = await getReviewByMovieAndUser(movieId, userId);
    res.send(reviews)

  } catch(err) {
    next(err)
  }
})

reviewsRouter.post('/', requireUser, async (req, res, next) => {
  const {content = "", rating, name, movieId} = req.body;
  const reviewData = {};

  try {
    
    reviewData.content = content;
    reviewData.rating = rating;
    reviewData.name = name;
    reviewData.movieId = movieId;
    reviewData.userId = req.user.id;
    
    const review = await createReview(reviewData);
    console.log("review data:", reviewData)
    
    if(review) {
      res.send(review);
    } else {
      next({
        name: 'PostCreationError',
        message: 'There was an error creating your review. Please try again.'
      })
    }
    
  } catch({name, message}) {
    next({name, message});
  }
})
reviewsRouter.delete('/:reviewId'), requireUser, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const reviewToUpdate = await getReviewById(reviewId);

    if(!reviewToUpdate) {
      return next ({
        name: "NotFound",
        message: `No review found by ID ${reviewId}`
      })
    } else if(req.user.id !== reviewToUpdate.userId) {
      res.status(403);
      return next({
        name: "WrongUserError",
        message: "You must be the same user who created this review to perform this action."
      });
    } else {
      const deletedReview = await deleteReview(reviewId)
      res.send({success: true, ...deletedReview})
    }


  } catch(err) {
    next(err)
  }
}

module.exports = reviewsRouter;
