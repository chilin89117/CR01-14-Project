const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  reviewId: {type: mongoose.Schema.Types.ObjectId, required: true},
  reviewTitle: {type: String, required: true, trim: true},
  owner: {
    _id: {type: mongoose.Schema.Types.ObjectId, required: true},
    uname: {type: String, required: true, trim: true}
  },
  body: {type: String, required: true, trim: true, maxlength: 500},
  rating: {type: Number, required: true, min: 1, max: 10}
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
