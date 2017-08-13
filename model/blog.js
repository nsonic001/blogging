const mongoose = require('mongoose');
const __ = require('underscore');
const connection = config.db_conn;

const BlogSchema = new mongoose.Schema({
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  modified: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
});


BlogSchema.pre('save', (next) => {
  if (this.isNew) {
    this.created = Date.now();
    this.modified = Date.now();
  }
  this.modified = Date.now();
  next();
});

BlogSchema.pre('update', (next) => {
  this.modified = Date.now();
  next();
});


const BlogModel = connection.model('blogs', BlogSchema, 'blogs');

var model = {
  create: () => {
    return new Promise(
      (resolve, reject) => {
        BlogModel.create({}, (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        })
      }
    );
  },
  list: (limit, offset) => {
    return new Promise(
      (resolve, reject) => {
        console.log("limit, offset", limit, offset);
        BlogModel.find()
          .skip(offset)
          .limit(limit)
          .sort({ modified: -1 })
          .exec(
            (err, blogs) => {
              console.log("in callback ", err, blogs);
              if (!err) {
                resolve(blogs);
              } else {
                reject(err);
              }
            }
          );
      }
    );
  },
  get: (blog_id) => {
    return new Promise(
      (resolve, reject) => {
        BlogModel.findById(blog_id, (err, blog) => {
          if (!err) {
            resolve(blog);
          } else {
            reject(err);
          }
        });
      }
    );
  },
  count: () => {
    return new Promise(
      (resolve, reject) => {
        BlogModel.count({}, (err, count) => {
          if (!err) {
            resolve(count);
          } else {
            reject(err);
          }
        });
      }
    );
  }
};
module.exports = model;