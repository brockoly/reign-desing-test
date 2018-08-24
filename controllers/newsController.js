const mongoose = require('mongoose');
const request = require('request');
const dateformat = require('dateformat');
const moment = require('moment');
const news = require('../models/news');

const prettyDate = (date) => {
  // date formatting
  const currentDate = dateformat(new Date(), 'isoDateTime');
  const newsDate = dateformat(date, 'isoDateTime');
  // yesterdays date formated as m/d/y
  const yesterday = dateformat(moment(currentDate).subtract(1, 'day'), 'shortDate'); 
  const diff = moment(currentDate).diff(newsDate, 'hours'); 
  if (yesterday !== dateformat(newsDate, 'shortDate') && diff <= 24) { 
    return dateformat(newsDate, 'shortTime');
  } else if (yesterday === dateformat(newsDate, 'shortDate')) {
    return 'Yesterday';
  } else {
    return dateformat(newsDate, 'mmm d');
  }
}

exports.all = async () => {
  // Listing all news with status true
  try {
    const allNews = await news.find({ status: true }).sort({ created_at: -1 });
    const currentDate = dateformat(new Date(), 'isoDateTime');
    for (const n of allNews) {
      n.created_at = prettyDate(n.created_at);
    }
    return allNews;
  } catch (err) {
    return `Error: ${err}`;
  }
};

exports.saveLiveNews = async () => {
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
        // discard news if there is no title and url
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
      return { success: false };
    }
  });
  return { success: true };
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
