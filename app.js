const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// 1) MIDDLEWARES

app.use(morgan('dev'));
app.use(express.json()); //add data of body

app.use((req, res, next) => {
  console.log('new request passed in middleware :)');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTE HANDLERS
// inside routes directory

// 3) ROUTES

// inside routes directory
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app; // 4) start server
