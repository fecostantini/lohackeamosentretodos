const express = require('express');
const router = express.Router();

router.use('/twitter', require('./rutasTwitter'));
router.use('/webscrapping', require('./rutasWebScrapping'));

module.exports = router;
