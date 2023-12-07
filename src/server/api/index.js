const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db')

const volleyball = require('volleyball')
apiRouter.use(volleyball)

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } else if (auth.startsWith(prefix)) {
    // TODO - Get JUST the token out of 'auth'
    const token = auth.slice(prefix.length);
    console.log('token:', token)

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      console.log('parsedToken:', parsedToken)
      const id = parsedToken && parsedToken.id
      console.log('id:', id)
      if(id) {
        req.user = await getUserById(id);
        next()
      }
      // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'

    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const moviesRouter = require('./movies');
apiRouter.use('/movies', moviesRouter);

const reviewsRouter = require('./reviews');
apiRouter.use('/reviews', reviewsRouter)
apiRouter.use('/reviews/users', reviewsRouter)

const commentsRouter = require('./comments');
apiRouter.use('/comments', commentsRouter)
apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  }) //

module.exports = apiRouter;