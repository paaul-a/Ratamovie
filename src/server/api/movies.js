const express = require('express');
const moviesRouter = express.Router();


const { getAllMovies
  // import functions from db index.js
} = require('../db/movies')

moviesRouter.get('/', async (req, res, next) => {
  try {
    const movies = await getAllMovies();
    console.log('Movies:', movies);
    res.send({movies});

  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports =  moviesRouter; 
