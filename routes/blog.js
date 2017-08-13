const express = require('express');
const router = express.Router();
const Blog = require('./../controller/blog');

router.get('/:id/', Blog.get);
router.get('/', Blog.list);
router.post('/', Blog.post);
module.exports = router;