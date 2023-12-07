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
// reviewData.patch('/:reviewId', requireUser, async (req, res, next) => {
//   const { reviewId } = req.params;
//   const { title, content } = req.body; //need content, comments?

//   const updateFields = {};

//   if (tags && tags.length > 0) {
//     updateFields.tags = tags.trim().split(/\s+/);
//   }

//   if (title) {
//     updateFields.title = title;
//   }

//   if (content) {
//     updateFields.content = content;
//   }

//   try {
//     const originalReview = await getReviewByMovieId(postId);

//     if (originalReview.author.id === req.user.id) {
//       const updatedReview = await updateReview(reviewId, updateFields);
//       res.send({ post: updatedReview })
//     } else {
//       next({
//         name: 'UnauthorizedUserError',
//         message: 'You cannot update a post that is not yours'
//       })
//     }
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

// reviewsRouter.delete('/:reviewId', requireUser, async (req, res, next) => 
// {
//   try {
//   const { reviewId } = req.params;
//     const reviewToUpdate = await getReviewByMovieId(reviewId); 
//     if (!reviewToUpdate){
//       return next({
//         name: 'PostNotFound', 
//         message: 'Sorry that post was not found',
//       });
//     } 
//      if (req.user.id !== reviewToUpdate.author.id){ //double check wher to put author and user and make sure that is consistent throughout 
//       console.log('aut header:', req.headers.authorization);
//       console.log('User associated w token:', req.user.id);
//       console.log('reviewToUpdate:', reviewToUpdate.author.id);
//       return res.status(403).send({
//         success: false,
//         message: 'Sorry you cant delete a post that doesnt belong to you',
//       });
//     }
   
//       const deletedReview = await deleteReview(reviewId);
//       res.status(204).send({ success: true,deletedReview });
    
//   }catch ({name, message}){
//     next({name, message});
//   }
// });

module.exports = reviewsRouter;
