const express = require('express');
const moviesRouter = express.Router();


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