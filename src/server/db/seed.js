const db = require('./client')
const { createUser } = require('./users')
const { createComment } = require('./comments')
const { createReview } = require('./reviews')
const { createMovie } = require('./movies')
const { createMovieReview } = require('./reviews')

const dataObjects = require('./data.json')

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
    role: 'admin',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    role: 'admin'
  },
  // Add more user objects as needed
]

const reviews = [
  {
    content: "This movie was amazing!",
    rating: 5,
    name: "Emily Johnson",
    email: "emily@example.com",
    movieId: 1,
    userId: 1,
  },
  {
    content: "This movie made my head hurt",
    rating: 4,
    name: "Isabella García",
    email: "bella@example.com",
    movieId: 8,
    userId: 3,
  },
  {
    content: "Epic movie",
    rating: 3,
    name: "John Smith",
    email: "john@example.com",
    movieId: 10,
    userId: 5,
  },
  {
    content: "I loved this movie so much it rocks my world.",
    rating: 3,
    name: "Isabella García",
    email: "bella@example.com",
    movieId: 2,
    userId: 3,
  },
  {
    content: "Best film ever made.",
    rating: 4,
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    movieId: 1,
    userId: 4,
  },
];

const movieReviewData = [
  {
    movieId: 1,
    reviewId: 1,
    userId: 1,
  }
];

const comments = [
  {
    content: "I agree, great movie!",
    reviewId: 2,
    userId: 1,
  },
  {
    content: "I agree, great movie!",
    reviewId: 3,
    userId: 1,
  },
  {
    content: "I agree, great movie!",
    reviewId: 1,
    userId: 2,
  },
  {
    content: "I agree, great movie!",
    reviewId: 2,
    userId: 3,
  },
  {
    content: "I agree, great movie!",
    reviewId: 2,
    userId: 4,
  },
  {
    content: "I agree, great movie!",
    reviewId: 3,
    userId: 5,
  },

  // Add more dummy comments if needed
];

const dropTables = async () => {
  try {
    // Order of dropping tables is the opposite of creating them.  This avoids errors in deleting
    await db.query(`
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS movie_reviews;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS movies;
        DROP TABLE IF EXISTS users;
        `)
  } catch (err) {
    throw err
  }
}

/*----------------------
  CREATING TABLES
------------------------*/
/* Combinig the create-tables into 1 function */
const createTables = async () => {
  await createUsersTable()
  await createMoviesTable()
  await createReviewsTable()
  await createCommentsTable()
  await createMovieReviewsTable()
}

const createUsersTable = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL, 
            role VARCHAR(255) DEFAULT 'user'
        )`)
  } catch (err) {
    throw err
  }
}

const createMoviesTable = async () => {
  try {
    await db.query(`
      CREATE TABLE movies(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) DEFAULT 'title',
          image TEXT,
          description TEXT DEFAULT 'description',       
          director VARCHAR(255) DEFAULT 'director',
          year VARCHAR(255) DEFAULT 'year'
         
      )`)
  } catch (err) {
    throw err
  }
}
const createReviewsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          content TEXT NOT NULL,
          rating INTEGER CHECK (rating >= 0 AND rating <= 5),
          name VARCHAR(255) DEFAULT NULL,
          "movieId" INTEGER REFERENCES movies(id),
          "userId" INTEGER REFERENCES users(id)
      )`)
  } catch (err) {
    throw err
  }
}

const createCommentsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE comments(
          id SERIAL PRIMARY KEY,
          content TEXT NOT NULL,
          "reviewId" INTEGER REFERENCES reviews(id),
          "userId" INTEGER REFERENCES users(id)
          
      )`)
  } catch (err) {
    throw err
  }
}

const createMovieReviewsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE movie_reviews (
        id SERIAL PRIMARY KEY,
        "movieId" INTEGER REFERENCES movies(id),
        "reviewId" INTEGER REFERENCES reviews(id),
        "userId" INTEGER REFERENCES users(id)
      )`);
  } catch (err) {
    throw err;
  }
};
/*----------------------
  Inserting Values
------------------------*/

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role || 'user',
      });
    }
    console.log('User Data Successfully Seeded')
  } catch (error) {
    console.error('Error inserting seed data:', error)
  }
}

const insertMovies = async () => {
  try {
    for (const movieData of dataObjects) {
      await createMovie(movieData)
    }
    console.log('Movies Data Successfully Seeded.')
  } catch (error) {
    console.error('error inserting seed data:', error)
  }
}

const insertReviews = async () => {
  try {
    for (const review of reviews) {
      await createReview(review)
      // await createReview({
      //   content: review.content,
      //   name: review.name,
      //   email: review.email,
      //   movieId: review.movieId,
      //   userId: review.userId
      // })
    }
    console.log('Reviews Data Successfully Seeded.')
  } catch (error) {
    console.error('Error inserting seed data:', error)
  }
}

const insertMovieReviews = async () => {
  try {

    for(const movieReview of movieReviewData) {
      await createMovieReview(movieReview)
    }

    console.log('Movie Reviews Data Successfully Seeded.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
}

const insertComments = async () => {
  try {
    for (const comment of comments) {
      await createComment(comment)
      // await createComment({
      //   content: comment.content,
      //   reviewId: comment.reviewId,
      //   userId: comment.userId,
      // })
    }
    console.log('Comments Data Successfully Seeded.')
  } catch (error) {
    console.error('Error inserting seed data:', error)
  }
}



/*----------------------
  Running Functions in order
------------------------*/
const seedDatabase = async () => {
  try {
    db.connect()
    await dropTables()
    await createTables()
    await insertUsers()
    await insertMovies()
    await insertReviews()
    await insertComments()
    await insertMovieReviews()
  } catch (err) {
    throw err
  } finally {
    db.end()
  }
}

module.exports = seedDatabase;
