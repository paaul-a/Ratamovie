const express = require('express');
const moviesRouter = express.Router();


const { getAllMovies, 
  getMovieById
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

moviesRouter.get('/:movieId', async (req, res, next) =>{
  const { movieId } = req.params;
try{
  const movie = await getMovieById(movieId);
  if (movie){
    res.json(movie);
  } else{
    res.status(404).json({ error: 'Movie not found' });
  }
} catch (error) {
  console.error('Error fetching movie by ID:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

module.exports =  moviesRouter; 
