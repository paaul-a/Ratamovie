const db = require('./client')

async function createComment(comments) {
  await db.query(
    `INSERT INTO comments(content, "reviewId", "userId")
    VALUES($1, $2, $3);`,
    [comments.content, comments.reviewId, comments.userId]
  )
}

module.exports = {
  createComment,
}
