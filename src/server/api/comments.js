const express = require('express');
const commentsRouter = express.Router();

// const { requireUser } = require('./utils');-->DEFINE THIS SOMEWHERE!!!-->Do we need utils.js function???

const { 
  createComment,
  getCommentsByReviewId,
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
  const { title, content = "", reviewId } = req.body;
  const commentData = { content, reviewId, userId: req.user.id };
  try{
    const comment = await createComment(commentData);
    res.send(comment);
  } catch (error){
    console.error('Error creating comment: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//think i need something that specifies only user who made this can edit 
commentsRouter.patch('/:commentId', requireUser, async (req, res, next) =>{
  const { commentId } = req.params;
  const { updatedContent } = req.body;

  try{
    await editComment(commentId, updatedContent);
    resizeTo.status(200).json({message: 'content successfully updated'});
  }catch (error){
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

commentsRouter.delete('/:commentId', requireUser, async (req, res, next) =>{
  const { commentId } = req.params;
  const { updatedContent } = req.body;

  try{
    await deleteComment(commentId, updatedContent);
    resizeTo.status(200).json({message: 'content deleted updated'});
  }catch (error){
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = commentsRouter;