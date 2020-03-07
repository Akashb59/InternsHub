const Review = require('./../models/reviewModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  //Execute Query
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const review = await features.query;
  //Send Response
  res.status(200).json({
    status: 'Success',
    results: review.length,
    data: { review }
  });
});
exports.getReviewById = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError('No Review found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { review }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  //Review.findOne({_id:req.params.id})
  console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      Review: newReview
    }
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
    //re validate for each update
  });
  if (!review) {
    return next(new AppError('No Review found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      review
    }
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return next(new AppError('No Review found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: {
      review
    }
  });
});
