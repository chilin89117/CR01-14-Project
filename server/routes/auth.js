const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/register', auth, (req, res) => {
  if(req.user) res.redirect('/');
  else res.render('auth/register');
});

router.post('/register', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.genToken();
    res.cookie('auth', user.token).json({message: 'OK'});
  } catch(err) {
    next(err);
  }
});

router.get('/login', auth, (req, res) => {
  if(req.user) res.redirect('/');
  else res.render('auth/login');
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({message: 'No such email.'});
    const result = await user.comparePwd(req.body.pwd);
    if(!result) return res.status(400).json({message: 'Wrong password.'});
    await user.genToken();
    res.cookie('auth', user.token).json({message: 'OK'});
  } catch(err) {
    next(err);
  }
});

router.get('/logout', auth, async (req, res, next) => {
  if(!req.user) return res.redirect('/auth/login');
  try {
    await req.user.deleteToken();
    res.redirect('/');
  } catch(err) {
    next(err);
  }
});

module.exports = router;
