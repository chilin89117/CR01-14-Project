const config = {
  production: {
    SECRET: process.env.SECRET,
    DB: process.env.MONGODB_URI,
    PORT: process.env.PORT
  },
  default: {
    SECRET: 'secret123',
    DB: 'mongodb://localhost:27017/cr01-14',
    PORT: 3000
  }
};

exports.get = (env) => {
  return config[env] || config.default;
};
