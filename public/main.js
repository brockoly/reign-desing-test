const news = require('../controllers/newsController');
// return await news.disableArticle(id);
const disableArticle = async (id) => {
  // console.log('entra', id);
  return await news.disableArticle(id);
}