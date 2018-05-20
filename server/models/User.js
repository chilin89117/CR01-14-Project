const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT = 10;

const userSchema = mongoose.Schema({
  uname: {type: String, required: true, unique: 1, minlength: 6, maxlength: 20},
  fname: {type: String, required: true, trim: true, minlength: 2, maxlength: 40},
  lname: {type: String, required: true, trim: true, minlength: 2, maxlength: 40},
  email: {type: String, required: true, trim: true, unique: 1},
  pwd: {type: String, required: true, maxlength: 150},
  role: {type: Number, default: 2},
  token: {type: String, required: true}
});

userSchema.pre('save', function(next) {
  if(this.isModified('pwd')) {
    bcrypt.genSalt(SALT)
          .then(salt => bcrypt.hash(this.pwd, salt))
          .then(hashed => {
            this.pwd = hashed;
            next();
          })
          .catch(err => next(err));
  } else {
    next();
  }
});

userSchema.statics.findByToken = function(token) {
  const decoded = jwt.verify(token, config.SECRET);
  return User.findOne({_id: decoded, token});
};

userSchema.methods.genToken = function() {
  this.token = jwt.sign(this._id.toHexString(), config.SECRET);
  return this.save();
};

userSchema.methods.comparePwd = function(pwd) {
  return bcrypt.compare(pwd, this.pwd);
};

userSchema.methods.deleteToken = function() {
  return this.update({$unset: {token: 1}});
};

const User = mongoose.model('User', userSchema);

module.exports = User;