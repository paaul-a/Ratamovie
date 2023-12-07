const db = require('./client')

async function createComment(comments) {
  const { rows: [ comment ]} =  await db.query(
      `INSERT INTO comments(content, "reviewId", "userId")
      VALUES($1, $2, $3)
      RETURNING *`,
      [comments.content, comments.reviewId, comments.userId]
    )
    return comment
  } 

  async function getCommentById(commentId) {
    try{
      const { rows: [comment] } = await db.query(`
      SELECT * 
      FROM comments
      WHERE id = $1`, [commentId]);
      return comment;
    } catch (error){
      throw error;
    }
  }

async function getCommentsByReviewId(reviewId){
  try{
    const { rows: comments } = await db.query(`
    SELECT * 
    FROM comments 
    WHERE "reviewId" = $1`, [reviewId]);
    return comments;
  }catch (error){
    throw error;
  }
}

async function editComment(commentId, updatedContent) {
  try{
    await db.query(`
    UPDATE comments
    SET content =$1
    WHERE id = $2`, [updatedContent, commentId]
    );
  } catch (error){
    throw error;
  }
}

async function deleteComment(commentId){
  try{
    await db.query(`
    DELETE FROM comments 
    WHERE id = $1;`, [commentId]
    );
  } catch (error){
    throw error;
  }
}
module.exports = {
  createComment,
  editComment,
  deleteComment,
  getCommentsByReviewId,
  getCommentById
}
