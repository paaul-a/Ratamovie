const express = require('express');
const commentsRouter = express.Router();

// const { requireUser } = require('./utils');

const { 
  createComment,
  // getAllPosts,
  updateComment,
  getCommentByReviewId,
  deleteComment,
} = require('../db');

commentsRouter.get('/', async (req, res, next) => {
  try {
    const reviewComment = await getCommentByReviewId();

    const comments = reviewComment.filter(comment => {
      if (comment.active) {
        return true;
      }
    
      if (req.user && post.user.id === req.user.id) { //double check user 
        return true;
      }
    
      // none of the above are true
      return false;
    });
  
    res.send({
      comments
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

commentsRouter.post('/', requireUser, async (req, res, next) => {
  console.log('hello');
  const { title, content = "" } = req.body;

  const commentData = {};

  try {
    commentData.userId = req.user.id; //double check this one user or author
    //commentData.reviewId = review.id//
    commentData.title = title;
    commentData.content = content;

    const comment = await createComment(commentData);
    console.log("******", commentData);
    if (comment) {
      res.send(comment);
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

commentData.patch('/:commentId', requireUser, async (req, res, next) => {
  const { commentId } = req.params;
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
    const originalComment = await getCommentByReviewId(commentId);

    if (originalComment.user.id === req.user.id) {//double check user here
      const updatedComment = await updateComment(commentId, updateFields);
      res.send({ post: updatedComment })
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

commentsRouter.delete('/:commentId', requireUser, async (req, res, next) => 
{
  try {
  const { commentId } = req.params;
    const commentToUpdate = await getCommentByReviewId(commentId); 
    if (!commentToUpdate){
      return next({
        name: 'PostNotFound', 
        message: 'Sorry that post was not found',
      });
    } 
     if (req.user.id !== commentToUpdate.user.id){ //double check wher to put author and user and make sure that is consistent throughout 
      console.log('aut header:', req.headers.authorization);
      console.log('User associated w token:', req.user.id);
      console.log('commentToUpdate:', commentToUpdate.author.id);
      return res.status(403).send({
        success: false,
        message: 'Sorry you cant delete a post that doesnt belong to you',
      });
    }
   
      const deletedComment = await deleteComment(commentId);
      res.status(204).send({ success: true,deletedComment });
    
  }catch ({name, message}){
    next({name, message});
  }
});

module.exports = commentsRouter;
