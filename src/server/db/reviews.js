const db = require('./client')

// async function createReview(reviews) {
//   await db.query(
//     `INSERT INTO reviews (content, rating, name, "movieId", "userId")
//     VALUES($1, $2, $3, $4, $5);`,
//     [reviews.content, reviews.rating, reviews.name, reviews.movieId, reviews.userId]
//   )
// }

async function createReview(reviews) {
  const query = `
    INSERT INTO reviews (content, rating, name, "movieId", "userId")
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;`;

  try {
    const result = await db.query(query, [
      reviews.content,
      reviews.rating,
      reviews.name,
      reviews.movieId,
      reviews.userId,
    ]);

    // Log the SQL query
    console.log('SQL Query:', result.query);

    // Rest of the function...
  } catch (error) {
    throw error;
  }
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
      `,
      [reviewId]
    )

    if (!review) {
      throw {
        name: 'ReviewNotFoundError',
        message: 'Could not find a review with that id',
      }
    }
    //
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

module.exports = {
  createReview,
  getReviewByMovieId,
  getReviewByMovieAndUser,
  //getReviewById,

  // getComments,
  // getPetById,
  // createPet,
}
