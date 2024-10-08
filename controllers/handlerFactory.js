const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const deletedDocument = await Model.findByIdAndDelete(req.params.id);

    if (!deletedDocument) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({ status: 'success', data: null });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedModel = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedModel) {
      return next(new AppError('No documennt found with that ID', 404));
    }
    res.status(200).json({ status: 'success', data: updatedModel });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newModel = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newModel,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({ status: 'success', data: doc });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // ALLOW NESTED GET REVIEWS ON TOUR
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // BUILD QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // EXECUTE QUERY
    const docs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: { docs },
    });
  });
