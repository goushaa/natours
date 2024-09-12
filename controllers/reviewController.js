const Review = require('../models/reviewModel');
// const APIFeatures = require('../utils/apiFeatures');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  //   // BUILD QUERY
  //   const features = new APIFeatures(Review.find(), req.query)
  //     .filter()
  //     .sort()
  //     .limitFields()
  //     .paginate();

  //   // EXECUTE QUERY
  //   const reviews = await features.query;
  const reviews = await Review.find();

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

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
