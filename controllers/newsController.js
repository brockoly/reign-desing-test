const mongoose = require('mongoose');
const news = require('../models/news');

exports.saveLiveNews = async (req, res) => {
  const https = require('https');
  https
    .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', resp => {
      let data = '';
      resp.on('data', chunk => {
        data += chunk;
      });
      resp.on('end', async () => {
        try {
          const { hits } = JSON.parse(data);
          for (const d of hits) {
            let title = '';
            let url = '';
            if (d.title === null) {
              title = d.story_title;
            } else {
              title = d.title;
            }
            if (d.url === null) {
              url = d.story_url;
            } else {
              url = d.url;
            }
            if (title && url) {
              const reducedData = {
                created_at: d.created_at,
                title,
                author: d.author,
                objectID: d.objectID,
                url,
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
          onsole.log('Error: ' + err);
        }
      });
    })
    .on('error', err => {
      console.log('Error: ' + err.message);
    });
  return res.status(200).json({ success: true });
};
