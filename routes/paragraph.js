const express = require('express');
const router = express.Router();
const Paragraph = require('./../controller/paragraph');
router.post('/:paragraph_id/comment', Paragraph.comment);
module.exports = router;