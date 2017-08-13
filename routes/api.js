/**
 * This file is called from index.js file to specify all routes of form (/api/*)
 * */

const express = require('express');
const router = express.Router();
const blog = require('./blog');
const paragraph = require('./paragraph');
router.use('/blog/', blog);
router.use('/paragraph/', paragraph);
module.exports = router;