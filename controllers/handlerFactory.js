const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

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
