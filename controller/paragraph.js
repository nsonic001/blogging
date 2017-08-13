const ParagraphService = require('./../service/paragraph');

module.exports = {
  comment: (req, res, next) => {
    var paragraph_id = req.params.paragraph_id;
    var comment = req.body.data;
    console.log("new comment", paragraph_id, comment);
    ParagraphService.postComment(paragraph_id, comment).then(
      comments => {
        res.status(201).json(comments);
      }
    ).catch(
      err => {
        res.status(500).json(err);
      }
    );
  }
}