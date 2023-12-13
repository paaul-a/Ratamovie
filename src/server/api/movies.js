const express = require('express');
const moviesRouter = express.Router();


const { 
  getAllMovies, 
  getMovieById
} = require('../db/movies');

const { requireAdmin } = require('./utils');

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
  
  const movieIdInt = parseInt(movieId);
  if (isNaN(movieIdInt)) {
    return res.status(400).json({ error: 'Invalid movie ID' });
  }
  try{
    const movie = await getMovieById(movieId);
    if (movie){
      res.send(movie);
    } else{
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

moviesRouter.patch('/:movieId', requireAdmin, async (req, res, next) => 
{
  const { movieId } = req.params;
  const { image, description } = req.body.updatedMovie;
  try{
    const updatedMovie = await editMovie(movieId, { image, description });
    res.status(200).json(updatedMovie);
  } catch (error){
    next(error)
  }
});
module.exports =  moviesRouter; 
