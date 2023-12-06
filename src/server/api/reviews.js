const express = require('express');
const reviewsRouter = express.Router();


const { 
  createReview,
  updateReview,
  getReviewByMovieId,
  deleteReview,
} = require('../db/index');

reviewsRouter.get('/', async (req, res, next) => {
  try {
    const movieReview = await getReviewByMovieId();

    const reviews = movieReview.filter(review => {
      // the post is active, doesn't matter who it belongs to
      if (review.active) {
        return true;
      }
    
      // the post is not active, but it belogs to the current user
      if (req.user && post.user.id === req.user.id) { //double check user or author
        return true;
      }
    
      // none of the above are true
      return false;
    });
  
    res.send({
      reviews
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

reviewsRouter.post('/', requireUser, async (req, res, next) => {
  console.log('hello');
  const { title, content = "" } = req.body;

  const reviewData = {};

  try {
    reviewData.userId = req.user.id; //double check this one user or author
    reviewData.title = title;
    reviewData.content = content;

    const review = await createReview(reviewData);
    console.log("******", reviewData);
    if (review) {
      res.send(review);
    } else {
      next({
        name: 'PostCreationError',
        message: 'There was an error creating your post. Please try again.'
      })
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

reviewData.patch('/:reviewId', requireUser, async (req, res, next) => {
  const { reviewId } = req.params;
  const { title, content } = req.body; //need content, comments?

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  if (title) {
    updateFields.title = title;
  }

  if (content) {
    updateFields.content = content;
  }

  try {
    const originalReview = await getReviewByMovieId(postId);

    if (originalReview.author.id === req.user.id) {
      const updatedReview = await updateReview(reviewId, updateFields);
      res.send({ post: updatedReview })
    } else {
      next({
        name: 'UnauthorizedUserError',
        message: 'You cannot update a post that is not yours'
      })
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

reviewsRouter.delete('/:reviewId', requireUser, async (req, res, next) => 
{
  try {
  const { reviewId } = req.params;
    const reviewToUpdate = await getReviewByMovieId(reviewId); 
    if (!reviewToUpdate){
      return next({
        name: 'PostNotFound', 
        message: 'Sorry that post was not found',
      });
    } 
     if (req.user.id !== reviewToUpdate.author.id){ //double check wher to put author and user and make sure that is consistent throughout 
      console.log('aut header:', req.headers.authorization);
      console.log('User associated w token:', req.user.id);
      console.log('reviewToUpdate:', reviewToUpdate.author.id);
      return res.status(403).send({
        success: false,
        message: 'Sorry you cant delete a post that doesnt belong to you',
      });
    }
   
      const deletedReview = await deleteReview(reviewId);
      res.status(204).send({ success: true,deletedReview });
    
  }catch ({name, message}){
    next({name, message});
  }
});

module.exports = reviewsRouter;
