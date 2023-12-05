

const db = require('./client')
// const bcrypt = require('bcrypt');
// const SALT_COUNT = 10;


  async function createMovie(movies) {
    await db.query(
      `INSERT INTO movies(title, description, director, year )
    VALUES($1, $2, $3, $4 );`,
      [ movies.title, movies.description, movies.director, movies.year ]
    )
    try{

    } catch(err){
    throw err;}
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
 