const db = require('./client')
// const bcrypt = require('bcrypt');
// const SALT_COUNT = 10;

// function getReviews(id) {SELECT * FROM reviews
//     WHERE item_id = ${id};
//          }

async function createComment(comments) {
  await db.query(
    `INSERT INTO comments(name, date, rating,)
    VALUES($1, $2, $3,);`,
    [comments.name, comments.date, comments.rating]
  )
}

module.exports = {
  // getComments,
  createComment,

  // getPetById,
  // createPet,
}
