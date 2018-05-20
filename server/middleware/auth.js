const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    if(token) req.user = await User.findByToken(token);
    else req.user = null;
    next();
  } catch(err) {
    next(err);
  }
};

module.exports = auth;
