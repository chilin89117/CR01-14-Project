const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  title: {type: String, required: true, trim: true},
  body: {type: String, required: true, trim: true, maxlength: 500},
  rating: {type: Number, required: true, min: 1, max: 10},
  owner: {
    _id: {type: mongoose.Schema.Types.ObjectId, required: true},
    uname: {type: String, required: true, trim: true}
  }
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
