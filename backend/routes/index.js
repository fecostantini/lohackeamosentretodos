const express = require('express');
const router = express.Router();

router.use('/twitter', require('./rutasTwitter'));
router.use('/webscrapping', require('./rutasWebScrapping'));
router.use('/webscrappingSADI', require('./rutasWebScrapingSADI'));

module.exports = router;
