const { Client } = require('pg')
const db = require('./reviews')


  async function createReview(reviews) {
    await Client.query(
      `INSERT INTO comments(id, name, email,)
    VALUES($1, $2, $3,);`,
      [reviews.id, reviews.name, reviews.email, ]
    )
  }

module.exports = {
    // getComments,
  createReview,
    

    // getPetById,
    // createPet,
  }
 