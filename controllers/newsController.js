const mongoose = require('mongoose');
const news = require('../models/news');
const dateformat = require('dateformat');
const moment = require('moment');
const request = require('request');

exports.all = async () => {
  try {
    const allNews = await news.find({ status: true }).sort({ created_at: -1 }); // List all news in the db that are available
    for (const n of allNews) {
      const diff = moment(new Date()).diff(n.created_at, 'days');
      if (diff === 0) {
        n.created_at = dateformat(n.created_at, 'shortTime');
      } else if (diff === 1) {
        n.created_at = 'Yesterday';
      } else {
        n.created_at = dateformat(n.created_at, 'mmm, d');
      }
    }
    return allNews;
  } catch (err) {
    return `Error: ${err}`;
  }
};

exports.saveLiveNews = async (req, res) => {
  request('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', async (error, response, body) => {
    try {
      if (error) {
        console.log('Error: ' + error);
        return res.status(200).json({ success: false });
      }
      const { hits } = JSON.parse(body);
      for (const d of hits) {
        let title = '';
        let url = '';
        title = d.title === null ? d.story_title : d.title;
        url = d.url === null ? d.story_url : d.url;
        if (title && url) {
          const reducedData = {
            created_at: d.created_at,
            title,
            author: d.author,
            objectID: d.objectID,
            url
          };
          const article = await news.findOne({
            objectID: reducedData.objectID
          });
          if (!article) {
            news.create(reducedData);
          }
        }
      }
    } catch (err) {
      console.log('Error: ' + err);
      return res.status(200).json({ success: false });
    }
  });
  return res.status(200).json({ success: true });
};

exports.disableArticle = async (req, res) => {
  try {
    const update = await news.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.query.id) },
      { $set: { status: false } },
      { new: true }
    );
    res.redirect('/');
    return res.status(200).json({ success: true, update });
  } catch (err) {
    return `Error: ${err}`;
  }
};
