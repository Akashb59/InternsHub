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
    if (req.originalUrl === '/api/v1/reviews/') {
      let query = Model.find({
        user: req.body.user,
        internship: req.body.internship
      });
      const doc = await query;
      //console.log(doc[0]);
      if (doc[0]) {
        return next(
          new AppError('Only One Rating allowed for an Internship', 400)
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
    //console.log(doc);
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
    //console.log(req.originalUrl);
    if (req.originalUrl === '/api/v1/internships/')
      req.query.sort = '-starts_on';
    if (req.originalUrl === '/api/v1/skillTypeMasters/')
      req.query.sort = 'skill_name';

    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sorter()
      .limitFields()
      .paginate();

    let doc = await features.query;
    //Send Response
    if (req.originalUrl === '/api/v1/internships/') {
      //console.log(doc);
      //doc.filter(data => data.ends_on >= Date.now());
      doc = doc.map(data => {
        const active = data.starts_on.getTime() + 7 * 24 * 60 * 60 * 1000;
        if (active >= Date.now()) {
          //console.log(active);
          //console.log(Date.now());
          return data;
        }
      });
    }
    doc = doc.filter(data => data !== undefined);
    res.status(200).json({
      status: 'Success',
      results: doc.length,
      data: {
        doc
      }
    });
  });
