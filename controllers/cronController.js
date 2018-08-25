const cron = require('node-cron');
const news = require('./newsController');

exports.startWatch = async () => {
  try {
    const liveNews = await news.saveLiveNews();
    console.log('Getting news', new Date());
    cron.schedule('*/60 * * * *', async () => {
      const liveNews = await news.saveLiveNews();
      console.log('Getting news', new Date());
    });
  } catch (err) {
    console.log(`Error ${err}`);
  }
};
