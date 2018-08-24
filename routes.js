const index = require('./routes/index');
const news = require('./routes/news');

module.exports = (app) => {
  app.use('/', index);
  app.use('/news', news);

  app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found.' });
    next();
  });
};
