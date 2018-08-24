require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

require('./routes')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.Promise = Promise;

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

const db = mongoose.connection;

db.once('open', () => {
  console.log('connection OK!');
});

module.exports = app;