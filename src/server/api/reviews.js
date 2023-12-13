const express = require('express');
const reviewsRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');



const { 
  getReviewByMovieId,
  getReviewByMovieAndUser,
  createReview,
  getReviewById,
  deleteReview,
  getReviewByUserId,
  editReview,
  getAllReviews
} = require('../db/reviews');

reviewsRouter.get('/', requireAdmin, async(req, res, next) => {
  try{
    const reviews = await getAllReviews();
    res.json({ reviews });
  } catch (error){
    next(error);
  }
});

reviewsRouter.get('/:movieId', async (req, res, next) => {
  const movieId = req.params.movieId

  try {
    const reviews = await getReviewByMovieId(movieId);
  
    res.json({
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

reviewsRouter.get('/me/:userId', async (req, res, next) => {
  const userId  = req.params.userId;
  try{
    const reviews = await getReviewByUserId(userId);
    console.log('reviews sent in response: ', reviews);
    res.json({ reviews });
  } catch (error){
    next(error);
  }
});

reviewsRouter.post('/', requireUser, async (req, res, next) => {
  const {content = "", rating, movieId} = req.body;
  const reviewData = {};

  try {
    
    reviewData.content = content;
    reviewData.rating = rating;
    reviewData.name = req.user.name;
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
});

reviewsRouter.delete('/:reviewId', requireUser, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    console.log('deleting review with ID', reviewId)

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
      res.send({ success: true, deletedReview })
    }


  } catch(err) {
    next(err)
  }
});

//no essential for our site, admin shouldnt be able to change a users review rather just delete it if they dont like it/doesnt align w values of company or whatever
reviewsRouter.patch('/:reviewId', requireUser, async (req, res, next) =>{
  const { reviewId } = req.params;
  console.log('updating review w ID', reviewId);
  const { updatedReview } = req.body;
  try{
    const reviewToUpdate = await getReviewById(reviewId);
    
    if(!reviewToUpdate) {
      return next({
        name: 'ReviewNotFound',
        message: 'Sorry, that review wasnt found',
      });
    }
    if (req.user.id !== reviewToUpdate.userId){
      return res.status(403).send({
        success: false, 
        message: 'Sorry you cannot edit a post that is not yours!'
      });
    }
    await editReview(reviewId, updatedReview);
    res.status(200).json({ message: 'Content succesfull updated' });
  } catch (error) {
    console.error( 'Error updating Review: ', error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});


//ADMIN ROUTES FOR EDIT AND DELETE BELOW
reviewsRouter.delete('/admin/:reviewId', requireAdmin, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    console.log('deleting review with ID', reviewId)

    const reviewToUpdate = await getReviewById(reviewId);

    if(!reviewToUpdate) {
      return next ({
        name: "NotFound",
        message: `No review found by ID ${reviewId}`
      })
    }  else {
      const deletedReview = await deleteReview(reviewId)
      res.send({ success: true, deletedReview })
    }


  } catch(err) {
    next(err)
  }
});

reviewsRouter.patch('/admin/:reviewId', requireAdmin, async (req, res, next) =>{
  const { reviewId } = req.params;
  console.log('updating review w ID', reviewId);
  const { updatedReview } = req.body;
  try{
    const reviewToUpdate = await getReviewById(reviewId);
    
    if(!reviewToUpdate) {
      return next({
        name: 'ReviewNotFound',
        message: 'Sorry, that review wasnt found',
      });
    }
    await editReview(reviewId, updatedReview);
    res.status(200).json({ message: 'Content succesfull updated' });
  } catch (error) {
    console.error( 'Error updating Review: ', error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});


module.exports = reviewsRouter;
