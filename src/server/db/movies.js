const db = require("./client");


async function createMovie(movie) {
  try {
    await db.query(
      `INSERT INTO movies(title, image, description, director, year)
      VALUES($1, $2, $3, $4, $5 );`,
      [movie.title, movie.image, movie.description, movie.director, movie.year]
    );
  } catch (err) {
    throw err;
  }
}

async function getAllMovies() {
  try {
    const result = await db.query(`
      SELECT * 
      FROM movies
    `);
    console.log(result.rows)
    return result.rows;

  } catch (err) {
    console.log("Error getting movies from the database:", err)
    throw err
  }
}

async function getMovieById(movieId){
  try{
    const result = await db.query( `
    SELECT * 
    FROM movies 
    WHERE id = $1
    `, [movieId]);
    return result.rows[0];
  } catch (error){
    throw error;
  }
}

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById
};
