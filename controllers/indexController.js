const mongoose = require('mongoose');
const news = require('../controllers/newsController');

exports.index = async (req, res) => {
  const allNews = await news.all();
  const data = {
    title: 'Test',
    headerTitle: 'HN Feed',
    subTitle: 'We <3 hacker news!',
    allNews
  }
  res
    .status(200)
    .render('../views/index', data);
};


