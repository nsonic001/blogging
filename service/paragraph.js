const os = require('os');
const BlogModel = require('./../model/blog');
const ParagraphModel = require('./../model/paragraph');
const __ = require('underscore');
var blogService = {
  findByBlogId: (blog_id) => {
    //- TODO: this should be a transaction
    return ParagraphModel.findByBlogId(blog_id);
  },
  postComment: (paragraph_id, comment) => {
    return ParagraphModel.pushComment(paragraph_id, comment);
  }
}

module.exports = blogService;