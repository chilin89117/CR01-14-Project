const express = require('express');
const router = express.Router();
const moment = require('moment');
const Review = require('../models/Review');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find()
                                .sort({_id: 'desc'})
                                .limit(10)
                                .exec();
    res.render('index', {reviews});
  } catch(err) {
    next(err);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const addComment = req.user ? true : false;
    const review = await Review.findById(req.params.id);
    const comments = await Comment.find({reviewId: review._id}).sort('-_id');
    res.render('review', {
      dt: moment(review.createdAt).format('MMMM Do YYYY, h:mm a'),
      review,
      comments,
      addComment
    });
  } catch(err) {
    next(err);
  }
});

router.post('/:id/comment', auth, async (req, res, next) => {
  try {
    const comment = new Comment({
      ...req.body,
      owner: {
        _id: req.user._id,
        uname: req.user.uname
      }
    });
    await comment.save();
    res.status(200).send();
  } catch(err) {
    next(err);
  }
});

module.exports = router;
