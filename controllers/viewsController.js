const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render template with data
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) get the data, for the requested tour (including reviews and guides )
  const tour = await Tour.findOne({ slug: req.params.slug }).populate([
    {
      path: 'reviews',
    },
    {
      path: 'guides',
      select: 'name role photo',
    },
  ]);

  if (!tour) return next(new AppError('There is no tour with that name', 404));

  // 2) Build Template

  // 3) Render template using data
  res.status(200).render('tour', {
    title: `${tour.name} TOUR`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com",
    )
    .render('login', {
      title: 'Log into your account',
    });
};
