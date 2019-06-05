const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const app = express();
require('dotenv').config();

//Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logging Middleware
app.use(morgan('dev'));

//Session Middleware
app.use(session({
  secret: 'process.env.SESSION_SECRET' || 'Secret Password',
  resave: false,
  saveUninitialized: false
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Static Middleware
app.use(express.static(path.join(__dirname, '../public')));

//API Routes
app.use('/api', require('./api/mainApiRoute.js'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//404 Error Handler
app.use( (req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

//500 Error Handler
app.use( (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

module.exports = app;
