const mongoose = require('mongoose');
const __ = require('underscore');
const connection = config.db_conn;

const ParagraphSchema = new mongoose.Schema({
  blog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'blogs' },
  text: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
  },
  order: {
    type: Number,
    required: true,
    index: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  modified: {
    type: Date,
    required: true,
    default: Date.now
  }
});


ParagraphSchema.pre('save', (next) => {
  if (this.isNew) {
    this.created = Date.now();
    this.modified = Date.now();
    this.comments = [];
  }
  this.modified = Date.now();
  next();
});


ParagraphSchema.pre('update', (next) => {
  this.modified = Date.now();
  next();
});

const ParagraphModel = connection.model('paragraphs', ParagraphSchema, 'paragraphs');

var model = {
  findByBlogId: (blog_id) => {
    return new Promise(
      (resolve, reject) => {
        ParagraphModel.find({ blog_id: blog_id }).exec(
          (err, paras) => {
            // console.log("in callback ", err, paras);
            if (!err) {
              resolve(paras);
            } else {
              reject(err);
            }
          }
        );
      }
    );
  },
  findBlogsAgg: (blog_ids) => {
    console.log("in findBlogsAgg", blog_ids);
    return new Promise(
      (resolve, reject) => {
        ParagraphModel
          .aggregate([{
            $sort: {
              order: -1
            }
          }, {
            $project: {
              text: 1,
              blog_id: 1,
              _id: 1,
            }
          }, {
            $group: {
              _id: '$blog_id',
              paragraphs: { $addToSet: { _id: '$_id', text: '$text' } }
            }
          }, {
            $match: {
              _id: {
                $in: blog_ids
              }
            }
          }])
          .exec(
            (err, paras) => {
              console.log("in callback ", err, paras);
              if (!err) {
                resolve(paras);
              } else {
                reject(err);
              }
            }
          );
      }
    );
  },
  insertMany: (blog_id, paragraphs) => {
    return new Promise(
      (resolve, reject) => {
        paragraphs = __.map(paragraphs, function(text, index) {
          return {
            text: text,
            blog_id: blog_id,
            order: index + 1
          }
        });
        ParagraphModel.insertMany(paragraphs, { ordered: true },
          (err, docs) => {
            // console.log("in insertMany callback", err, docs);
            if (!err)
              resolve(docs);
            else
              reject(err);
          });
      }
    );
  },
  pushComment: (id, comment) => {
    return new Promise(
      (resolve, reject) => {
        ParagraphModel.findOneAndUpdate({
            _id: id
          }, {
            $push: { comments: comment }
          }, {
            new: true
          },
          (err, data) => {
            console.log("comment post success", err, data);
            if (!err) {
              resolve(data);
            } else {
              reject(err);
            }
          }
        );
      }
    );
  }
};

module.exports = model;