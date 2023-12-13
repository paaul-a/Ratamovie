const db = require('./client')

async function createReview(reviews) {
  const {rows: [ review ]} = await db.query(
    `INSERT INTO reviews (content, rating, name, "movieId", "userId")
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`, 
    [reviews.content, reviews.rating, reviews.name, reviews.movieId, reviews.userId]
  );
  return review
};

const createMovieReview = async ({ movieId, reviewId, userId }) => {
  try {
    const { rows: [ movieReview ]} = await db.query(`
    INSERT INTO movie_reviews ("movieId", "reviewId", "userId")
    VALUES ($1, $2, $3)
    RETURNING *
    `, [movieId, reviewId, userId]);

    console.log(`Movie Review inserted successfully: movieId=${movieId}, reviewId=${reviewId}, userId=${userId}`);

    return movieReview;
  } catch(err) {
    throw err
  }
    
}

async function getReviewByUserId(userId){
  try {
    const { rows: reviews } = await db.query(`
    SELECT * 
    FROM reviews
    WHERE "userId" = $1
    `, [userId]);
    console.log('retrieved reviews:', reviews);
    return reviews;
  } catch (error) {
    throw error;
  }
}

async function getMovieReviewsByUserId(userId) {
  try {
    const { rows: movieReviews } = await db.query(`
      SELECT *
      FROM movie_reviews
      WHERE "userId" = $1;
    `, [userId]);

    console.log('Retrieved movie reviews:', movieReviews);
    return movieReviews;
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

async function getAllReviews() {
  try {
    const { rows: reviews } = await db.query(`
    SELECT *
    FROM reviews;
    `);
    return reviews;
  } catch (error) {
    throw error;
  }
}
// async function getUserReview(userId) {
//   try {
//     const { rows: reviewIds } = await db.query(`
//         SELECT id
//         FROM reviews
//         WHERE "userId"=$1;
//       `, [userId])

//     const reviews = await Promise.all(
//       reviewIds.map((review) => getReviewById(review.id))
//     )
//   } catch (error) {
//     throw error
//   }
// }

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
    await db.query('BEGIN');
    await db.query(`
    DELETE FROM comments
    WHERE "reviewId" = $1`, [reviewId]);

    const { rows: [review] } = await db.query(`
      DELETE FROM reviews
      WHERE id = $1
      RETURNING *`, [reviewId]);

      if (!review) {
        throw { name: 'ReviewNotFoundError', message: `Review with ID ${reviewId} not found`};
      }
      
      await db.query('COMMIT');
    
    return review;
  } catch(error) {
    await db.query('ROLLBACK')
    console.error('Error deleting review:', error);
    throw error
  }
}

async function editReview(reviewId, updatedReviewData) {
  const { content, rating } = updatedReviewData;
  try{
    const { rowCount } = await db.query(`
    UPDATE reviews
    SET content = $1, rating = $2
    WHERE id = $3
    RETURNING *`, [content, rating, reviewId]
    );
    if (rowCount === 0) {
      throw {
        name: 'ReviewNotFoundError',
        message: `Review with ID ${reviewId} not found.`,
      };
    }
    const updatedReview = await getReviewById(reviewId);
    return updatedReview;

  } catch (error){
    throw error;
  }
}

module.exports = {
  createReview,
  createMovieReview,
  getReviewByMovieId,
  getMovieReviewsByUserId,
  getReviewByMovieAndUser,
  getReviewById,
  deleteReview,
  editReview, 
  getAllReviews,
  getReviewByUserId
}
