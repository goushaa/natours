const Review = require('../models/reviewModel');
// const APIFeatures = require('../utils/apiFeatures');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  //   // BUILD QUERY
  //   const features = new APIFeatures(Review.find(), req.query)
  //     .filter()
  //     .sort()
  //     .limitFields()
  //     .paginate();

  //   // EXECUTE QUERY
  //   const reviews = await features.query;
  const reviews = await Review.find(filter);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});

// exports.getReview = catchAsync(async (req, res, next) => {
//   const tour = await Review.findById(req.params.id);

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }

//   res.status(200).json({ status: 'success', tour: tour });
// });

exports.setTourUserIds = (req, res, next) => {
  // ALLOW NESTED ROUTES
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.author) req.body.author = req.user.id;
  next();
};

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
