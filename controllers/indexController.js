const mongoose = require('mongoose');
const news = require('../models/news');

exports.index = async (req, res) => {
  const allNews = await news.find({ status: true });
  res.status(200).render('../views/index', { title: 'Test', headerTitle: 'HN Feed', subTitle: 'We <3 hacker news!', allNews })
};