const db = require('./client')

async function createReview(reviews) {
  const {rows: [ review ]} = await db.query(
    `INSERT INTO reviews (content, rating, name, "movieId", "userId")
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`, 
    [reviews.content, reviews.rating, reviews.name, reviews.movieId, reviews.userId]

    
  )
  return review
}

async function getReviewByMovieId(movieId) {
  try {
    const { rows: reviews } = await db.query(
      `
        SELECT *
        FROM reviews
        WHERE "movieId" = $1
      `,
      [movieId]
    )

    return reviews;
  } catch (error) {
    throw error
  }
}

async function getReviewById(reviewId) {
  try {
    const {
      rows: [review],
    } = await db.query(
      `
        SELECT *
        FROM reviews
        WHERE id=$1;
      `, [reviewId]

    )
    
    if (!review) {
      throw {
        name: 'ReviewNotFoundError',
        message: 'Could not find a review with that id',
      }
    }
    return review
  } catch (error) {
    throw error
  }
}

async function getUserReview() {
  try {
    const { rows: reviewIds } = await db.query(`
        SELECT id
        FROM reviews
        WHERE "userId"=${userId};
      `)

    const reviews = await Promise.all(
      reviewIds.map((review) => getReviewById(review.id))
    )
  } catch (error) {
    throw error
  }
}

async function getReviewByMovieAndUser(movieId, userId) {
  try {
    const { rows: reviews } = await db.query(`
      SELECT * 
      FROM reviews
      WHERE "movieId" = $1 AND "userId" = $2
      `,
      [movieId, userId]
    );
    return reviews;
  } catch(err) {
    throw err;
  }
}

async function deleteReview(reviewId) {
  try {
    const {rows: [review]} = await db.query(`
      DELETE FROM comments
      WHERE id = $1
      RETURNING *`, [reviewId]);
    
    return review;
  } catch(err) {
    throw err
  }
}

module.exports = {
  createReview,
  getReviewByMovieId,
  getReviewByMovieAndUser,
  getReviewById,
  deleteReview,
}
