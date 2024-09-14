const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

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

  // 2) Build Template

  // 3) Render template using data
  res.status(200).render('tour', {
    title: 'The Forest Hiker',
    tour,
  });
});
