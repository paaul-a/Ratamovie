async function getAllMovies() {
        try {
          const { rows } = await client.query(`
            SELECT * 
            FROM tags;
          `);
      
          return { rows }
        } catch (error) {
          throw error;
        }
      }
        






module.exports = {
    getAllMovies,
    ...require('./users')
}