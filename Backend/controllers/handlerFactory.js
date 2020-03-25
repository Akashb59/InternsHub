const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No Document found with that ID', 404));
    }
    res.status(204).json({
      status: 'Success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
      //re validate for each update
    });
    if (!doc) {
      return next(new AppError('No Document found with that ID', 404));
    }
    res.status(200).json({
      status: 'Success',
      data: {
        doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    //console.log(req.originalUrl);
    if (req.originalUrl === '/api/v1/enquiries/') {
      let query = Model.find({
        student: req.body.student,
        internship: req.body.internship
      });
      const doc = await query;
      //console.log(doc[0]);
      if (doc[0]) {
        return next(
          new AppError('Only One Enquiry allowed for an Internship', 400)
        );
      }
      //console.log(req.body);
    }
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        doc
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    console.log(doc);
    if (!doc) {
      // console.log('hey');
      return next(new AppError('No Document found with that ID', 404));
    }
    res.status(200).json({
      status: 'Success',
      data: doc
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    console.log(req.originalUrl);
    if (req.originalUrl === '/api/v1/internships/')
      req.query.sort = '-starts_on';
    if (req.originalUrl === '/api/v1/skillTypeMasters/')
      req.query.sort = 'skill_name';

    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sorter()
      .limitFields()
      .paginate();

    const doc = await features.query;
    //Send Response
    res.status(200).json({
      status: 'Success',
      results: doc.length,
      data: {
        doc
      }
    });
  });
