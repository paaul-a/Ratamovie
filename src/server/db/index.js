// const db = require("./client");


// async function getAllMovies() {
//         try {
//           const { rows } = await db.query(`
//             SELECT * 
//             FROM movies;
//           `);
      
//           return { rows }
//         } catch (error) {
//           throw error;
//         }
//       }
        






module.exports = {
    //getAllMovies,
    ...require('./users')
}