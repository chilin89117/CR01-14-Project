const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

router.get('/dashboard', auth, (req, res) => {
  if(!req.user) res.redirect('/auth/login');
  else res.render('admin/dashboard', {
    dashboard: true,
    isAdmin: req.user.role === 1 ? true : false
  });
});

router.get('/dashboard/add', auth, (req, res) => {
  if(!req.user) res.redirect('/auth/login');
  else res.render('admin/dashboard_add', {
    dashboard: true,
    isAdmin: req.user.role === 1 ? true : false
  });
});

router.post('/dashboard/add', auth, async (req, res, next) => {
  if(!req.user) return res.redirect('/auth/login');
  try {
    const review = new Review({
      ...req.body,
      owner: {
        _id: req.user._id,
        uname: req.user.uname
      }
    });
    await review.save();
    res.status(200).send(review);
  } catch(err) {
    next(err);
  }
});

router.get('/dashboard/comments', auth, async (req, res, next) => {
  if(!req.user) return res.redirect('/auth/login');
  try {
    const comments = await Comment.find({'owner._id': req.user._id});
    res.render('admin/dashboard_comments', {
      dashboard: true,
      isAdmin: req.user.role === 1 ? true : false,
      comments
    });
  } catch(err) {
    next(err);
  } 
});

module.exports = router;
