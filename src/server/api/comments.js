const express = require('express');
const commentsRouter = express.Router();
const { requireUser } = require('./utils');

const { 
  createComment,
  getCommentsByReviewId,
  getCommentById,
  deleteComment,
  editComment,
} = require('../db/comments');

commentsRouter.get('/:reviewId', async (req, res, next) => {
  const reviewId  = req.params.reviewId;
  try{
    console.log('Fetching comments for review ID: ', reviewId);

    const comments = await getCommentsByReviewId(reviewId);
    console.log('fetched comments:', comments)

    res.send(comments);
  } catch (error){
    console.error('Error fetching comments by review ID: ', error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
})

commentsRouter.post('/', requireUser, async (req, res, next) =>{
  const { content = "", reviewId } = req.body;
  const commentData = {}
  try{
    commentData.content = content;
    commentData.reviewId = reviewId;
    commentData.userId = req.user.id;

    const comment = await createComment(commentData);
    if(comment) {
      res.send(comment);
    } else {
      next({
        name: 'CommentCreationError',
        message: 'There was an error creating your comment. Please try again.'
      })
    }
    
  } catch({name, message}) {
    next({name, message});
  }
})
//NEED A GET COMMENT BY ID?????
//DO I NEED TO HAVE SOME SORT OF RETURN BC THESE FUNCTIOSN WORK JUST NOT SURE
commentsRouter.patch('/:commentId', requireUser, async (req, res, next) =>{
  const { commentId } = req.params;
  const { updatedContent } = req.body;
  try{
    const commentToUpdate = await getCommentById(commentId);
    if(!commentToUpdate) {
      return next({
        name: 'CommentNotFound',
        message: 'Sorry, that comment wasnt found',
      });
    }
    if (req.user.id !== commentToUpdate.userId){
      return res.status(403).send({
        success: false, 
        message: 'Sorry you cannot edit a post that is not yours!'
      });
    }
    await editComment(commentId, updatedContent);
    res.status(200).json({ message: 'Content succesfull updated' });
  } catch (error) {
    console.error( 'Error updating comment: ', error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

commentsRouter.delete('/:commentId', requireUser, async (req, res, next) =>{
  try {
  const { commentId } = req.params;
  const commentToUpdate = await getCommentById(commentId);

  if (!commentToUpdate){
    return next({
      name: 'Comment not found.',
      message: 'sorry, that comment was not found.'
    });
  }

  if (req.user.id !== commentToUpdate.userId){
    return res.status(403).send({
      success: false, 
      message: 'Sorry. That comment does not belong to you!'
    });
  }

  const deletedComment = await deleteComment(commentId);
  res.status(204).send({ success: true, deletedComment });

} catch ({ name, message}){
  next ({ name, message });
}
});

module.exports = commentsRouter;