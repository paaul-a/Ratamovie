require('dotenv').config()
// const config = require('../../config');
const os = require('os');

const hostname = os.hostname();
// const databaseHostname = config.database.hostname;
const databaseHostname = process.env.DATABASE_HOSTNAME;


console.log('Server Hostname:', hostname);
console.log('Database Hostname:', databaseHostname);

const express = require('express');
const router = require('vite-express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static('public'))

const db = require('./db/client')
db.connect()

const apiRouter = require('./api');
app.use('/api', apiRouter);

router.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);

module.exports = router;