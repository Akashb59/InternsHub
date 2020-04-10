const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.internshipReview = catchAsync(async (req, res, next) => {
  const review = await Review.find({
    user: req.body.user,
    internship: req.body.internship
  }).populate('internship');
  //console.log(review);
  if (!review) {
    //console.log('hey');
    return next(new AppError('No Review found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: review
  });
});

exports.getReviewByIdCompany = catchAsync(async (req, res, next) => {
  req.query.sort = '-internship';
  req.query.limit = '10';
  const features = new APIFeatures(
    Review.find({ company: req.params.id }),
    req.query
  )
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const review = await features.query;
  if (!review) {
    //console.log('hey');
    return next(new AppError('No Review found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    results: review.length,
    data: { review }
  });
});
exports.getAllReviews = factory.getAll(Review);
exports.getReviewById = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
