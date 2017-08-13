const BlogService = require('./../service/blog');
const os = require('os');
module.exports = {
  list: (req, res, next) => {
    var limit = 5,
      offset = 0;
    if (req.query.limit) {
      limit = parseInt(req.query.limit) || limit;
    }
    if (req.query.offset) {
      offset = parseInt(req.query.offset) || offset;
    }
    BlogService.list(limit, offset).then(
      response => {
        res.status(200).json(response);
      }
    ).catch(
      err => {
        res.status(500).json(err);
      }
    );
  },
  post: (req, res, next) => {
    var blog = req.body.data;
    paragraphs = blog.split(os.EOL + os.EOL);
    BlogService.create(paragraphs).then(
      response => {
        res.status(201).json(response);
      }
    ).catch(
      err => {
        res.status(500).json(err);
      }
    );
  },
  get: (req, res, next) => {
    var blog_id = req.params.id;
    BlogService.get(blog_id).then(
      blog => {
        if (!blog) {
          res.status(400).json({ id: 'id does not exist' });
        } else {
          res.status(200).json(blog);
        }
      }
    ).catch(
      err => {
        res.status(400).json(err);
      }
    );
  }
}