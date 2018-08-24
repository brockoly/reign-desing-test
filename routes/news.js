const express = require('express');
const news = require('../controllers/newsController');

const router = express.Router();

router.get('/saveLiveNews', news.saveLiveNews);

module.exports = router;