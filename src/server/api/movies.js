const express = require('express');
const moviesRouter = express.Router();

const { getAllMovies } = require('../db/movies'); 

// postRouter.get('/movies', async (req, res) => {
//   try {
//     const movies = await getAllMovies();
//     res.json(movies);
//   } catch (error) {
//     console.error('Error testing getAllMovies:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// const {
//   // import functions from db index.js
// } = require('../db')

// postsRouter.get('/', async (req, res, next) => {
//   try {

//   } catch {

//   }
// })
const { getAllMovies
  // import functions from db index.js
} = require('../db/index')

moviesRouter.get('/movies', async (req, res, next) => {
  try {
    const movies = await getAllMovies();
    console.log('Movies:', movies);
    res.json(movies);

  } catch (error){
    console.error('error fetching movies: ', error)
  }
})
