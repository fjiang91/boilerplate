const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

//Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logging Middleware
app.use(morgan('dev'));

//Static Middleware
app.use(express.static(path.join(__dirname, '../public')));

//API Routes
app.use('/api', require('./api'));

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
