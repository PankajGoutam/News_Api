const express = require('express');
const router = express.Router();

const {getAllNews,
       createNews,
       getNews,
       updateNews,
       deleteNews
      } = require('../Controllers/MyNews')


router.route('/').get(getAllNews).post(createNews);
router.route('/:id').get(getNews).put(updateNews).delete(deleteNews)

module.exports = router;