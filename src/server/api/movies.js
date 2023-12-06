const express = require('express');
const postRouter = express.Router();

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