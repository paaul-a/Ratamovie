const db = require('./client')

async function createMovie(movie) {
  await db.query(
    `INSERT INTO movies(title, description, director, year )
    VALUES($1, $2, $3, $4 );`,
    [movie.title, movie.description, movie.director, movie.year]
  )
  try {
  } catch (err) {
    throw err
  }
}
//   const getMovies = async(movie) => {
//     try {
//         const { rows: [ name ] } = await db.query(`
//         SELECT *
//         FROM users
//         WHERE email=$1;`, [ genre ]);

//         if(!user) {
//             return;
//         }
//         return user;
//     } catch (err) {
//         throw err;
//     }
// }

module.exports = {
  // getComments,
  createMovie,
  // getMovies,

  // getPetById,
  // createPet,
}
