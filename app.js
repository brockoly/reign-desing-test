require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cron = require('./controllers/cronController');

app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')));
require('./routes')(app);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.Promise = Promise;

if (process.env.ENVIRONMENT === 'production') {
  console.log('Environment:', process.env.ENVIRONMENT);
  mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`);
} else if (process.env.ENVIRONMENT === 'development') {
  console.log('Environment:', process.env.ENVIRONMENT);
  mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
}

const db = mongoose.connection;

db.once('open', () => {
  console.log('connection OK!');
  cron.startWatch();
});


module.exports = app;