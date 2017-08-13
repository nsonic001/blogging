const os = require('os');
const BlogModel = require('./../model/blog');
const ParagraphModel = require('./../model/paragraph');
const __ = require('underscore');
var blogService = {
  create: (paras) => {
    //- TODO: this should be a transaction
    return new Promise(
      (resolve, reject) => {
        BlogModel.create().then(
          blog_doc => {
            ParagraphModel.insertMany(blog_doc._id, paras).then(
              para_docs => {
                blog_doc = blog_doc.toObject({ getters: true, virtuals: false });
                blog_doc.paragraphs = para_docs;
                resolve(blog_doc);
              }
            ).catch(
              err => {
                reject(err);
              }
            );

          }
        ).catch(
          err => {
            reject(err);
          }
        );
      }
    );
  },
  list: (limit, offset) => {
    return new Promise(
      (resolve, reject) => {
        var promises = [BlogModel.list(limit, offset), BlogModel.count()];
        Promise.all(promises).then(
          data => {
            var blogs = data[0];
            var count = data[1];
            var blog_ids = __.map(blogs, function(obj) {
              return obj._id;
            });
            if (blog_ids.length) {
              ParagraphModel.findBlogsAgg(blog_ids).then(
                formatted_docs => {
                  resolve({
                    meta: {
                      limit: limit,
                      offset: offset,
                      total_count: count
                    },
                    objects: formatted_docs
                  });
                }
              ).catch(
                err => {
                  reject(err);
                }
              );
            } else {
              resolve({
                meta: {
                  limit: limit,
                  offset: offset,
                  total_count: count
                },
                objects: blogs
              });
            }

          }
        ).catch(
          err => {
            reject(err);
          }
        );
      }
    );
  },
  get: (blog_id) => {
    return new Promise(
      (resolve, reject) => {
        var promises = [BlogModel.get(blog_id), ParagraphModel.findByBlogId(blog_id)];
        Promise.all(promises).then(
          data => {
            var blog_doc = data[0].toObject({ getters: true, virtuals: false });
            blog_doc.paragraphs = data[1];
            resolve(blog_doc);
          }
        ).catch(
          err => {
            reject(err);
          }
        );
      }
    );
    return BlogModel.get(blog_id)
  }
}

module.exports = blogService;