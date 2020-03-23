const express = require('express');
const router = express.Router();

router.use('/twitter', require('./rutasTwitter'));

module.exports = router;
