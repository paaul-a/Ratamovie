const db = require('./client')
const { createUser } = require('./users')
const { createComment } = require('./comments')
const { createReview } = require('./reviews')
const { createMovie } = require('./movies')

const dataObjects = require('./data.json')

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
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
  },
  // Add more user objects as needed
]
const comments = [
  {
    id: 'troy',
    date: '2000',
    rating: '3star',
  },
]

const movies = [
  {
    TITLE: 'anything',
    DESCRIPTION: 'any',
    DIRECTOR: 'year',
    YEAR: 'anyy',
  },
  // dataObjects
]

const reviews = [
  {
    name: 'troy',
    id: '2000',
    email: '3star',
  },
]

const dropTables = async () => {
  try {
    // Order of dropping tables is the opposite of creating them.  This avoids errors in deleting
    await db.query(`
        DROP TABLE IF EXISTS comments;
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
}

const createUsersTable = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
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
          name VARCHAR(255) DEFAULT 'name',
          email VARCHAR(255) UNIQUE NOT NULL,
          "movieId" INTEGER REFERENCES movies(id) 
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
          date VARCHAR(255) DEFAULT 'date',
          rating VARCHAR(255) UNIQUE NOT NULL,
          "reviewId" INTEGER REFERENCES reviews(id)
          
      )`)
  } catch (err) {
    throw err
  }
}

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
      })
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
      await createReview({
        name: review.name,
        email: review.email,
        id: review.id,
      })
    }
    console.log('Reviews Data Successfully Seeded.')
  } catch (error) {
    console.error('Error inserting seed data:', error)
  }
}

const insertComments = async () => {
  try {
    for (const comment of comments) {
      await createComment({
        name: comment.name,
        date: comment.date,
        rating: comment.rating,
      })
    }
    console.log('Comments Data Successfully Seeded.')
  } catch (error) {
    console.error('Error inserting seed data:', error)
  }
}

/*----------------------
  Running Functions in order
------------------------*/
const seedDatabse = async () => {
  try {
    db.connect()
    await dropTables()
    await createTables()
    await insertUsers()
    await insertMovies()
    // * NOTE reviews and comments have errors.  Need fixing.
    //await insertReviews()
    //await insertComments()
  } catch (err) {
    throw err
  } finally {
    db.end()
  }
}

seedDatabse()
