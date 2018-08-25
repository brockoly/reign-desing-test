require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cron = require('./controllers/cronController');

app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')))
require('./routes')(app);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.Promise = Promise;

if (process.env.DB_PASSWORD && process.env.DB_PASSWORD !== 'null') {
  console.log('Production');
  mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`);
} else {
  console.log('Local');
  mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
}

const db = mongoose.connection;

db.once('open', () => {
  console.log('connection OK!');
});

cron.startWatch();

module.exports = app;