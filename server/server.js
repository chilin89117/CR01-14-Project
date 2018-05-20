const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

const Review = require('./models/Review');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const reviewsRoutes = require('./routes/reviews');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + './../views/layouts',
  partialsDir: __dirname + './../views/partials'
}));
app.set('view engine', 'hbs');

mongoose.connect(config.DB);

app.use(express.static(__dirname + './../public'));
app.use(express.static(__dirname + './../node_modules/font-awesome'));
app.use(express.static(__dirname + './../node_modules/jquery/dist'));

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('/reviews');
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/reviews', reviewsRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('*************\n' + err);
});

app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}...`));
