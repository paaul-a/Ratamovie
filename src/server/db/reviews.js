const { Client } = require('pg')
const db = require('./reviews')


  async function createReview(reviews) {
    await Client.query(
      `INSERT INTO comments(id, name, email,)
    VALUES($1, $2, $3,);`,
      [reviews.id, reviews.name, reviews.email, ]
    )
  }

  async function getReviewByMovieId(movieId) {
    try {
      const { rows: reviewIds } = await db.query(`
        SELECT reviews.id
        FROM reviews
        JOIN 
        WHERE 
      `, [movieId])
      
      return await Promise.all(reviewIds.map(
        review => getReviewById(review.id)
      ));

    } catch(error) {
      throw error
    }
  }

  async function getReviewById(reviewId) {
    try {
      const { rows: [ review ] } = await db.query(`
        SELECT *
        FROM reviews
        WHERE id=$1;
      `, [reviewId]);

      if(!review) {
        throw {
          name: "ReviewNotFoundError",
          message: "Could not find a review with that id"

        }
      }
      // 

    } catch(error) {
      throw error;
    }
  }

  async function getUserReview() {
    try {
      const { rows: reviewIds } = await db.query(`
        SELECT id
        FROM reviews
        WHERE "userId"=${ userId };
      `)

      const reviews = await Promise.all(reviewIds.map(
        review => getReviewById(review.id)
      ));

    } catch(error) {
      throw error;
    }
  }

  async function getReviewByUserId(userId) {
    // SELECT * FROM users JOIN reviews

    // ON reviews.user_id = user.id

    // WHERE [users.id](users.id) = $1

    // WHERE [user.id](user.id) = $1
  }

module.exports = {
  createReview,
  getReviewById,

    
    // getComments,
    // getPetById,
    // createPet,
  }
 