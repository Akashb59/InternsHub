const Internship = require('./../models/internshipModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getInternshipsFilter = catchAsync(async (req, res, next) => {
  //console.log('Hello');
  let query;
  let stip = [];
  let dur = [];
  let arr = [];
  //console.log(req.body);

  req.body.stipend[0] === true ? stip.push({ stipend: 0 }) : {};
  req.body.stipend[1] === true
    ? stip.push({
        $and: [{ stipend: { $gt: 0 } }, { stipend: { $lte: 5000 } }]
      })
    : {};
  req.body.stipend[2] === true
    ? stip.push({
        $and: [{ stipend: { $gte: 5000 } }, { stipend: { $lte: 10000 } }]
      })
    : {};
  req.body.stipend[3] === true ? stip.push({ stipend: { $gte: 10000 } }) : {};

  req.body.duration[0] === true
    ? dur.push({
        $and: [{ duration: { $gte: 0 } }, { duration: { $lte: 2 } }]
      })
    : {};
  req.body.duration[1] === true
    ? dur.push({
        $and: [{ duration: { $gte: 2 } }, { duration: { $lte: 4 } }]
      })
    : {};
  req.body.duration[2] === true ? dur.push({ duration: { $gte: 4 } }) : {};
  let startsOn;
  const category = { categories: req.body.categories };
  if (req.body.starts_on.default !== '') {
    startsOn = { starts_on: { $gte: req.body.starts_on } };
  }
  const type = { type_of_internship: req.body.type_of_internship };

  //query = { $and: [category, stipend2] };
  //query = { $or: stip };

  if (stip.length !== 0) {
    arr.push({ $or: stip });
  }
  if (dur.length !== 0) {
    arr.push({ $or: dur });
  }
  if (req.body.categories !== '') {
    arr.push(category);
  }
  if (req.body.starts_on.default !== '') {
    arr.push(startsOn);
  }
  if (req.body.type_of_internship !== '') {
    arr.push(type);
  }

  if (arr.length !== 0) {
    query = { $and: arr };
  } else {
    query = {};
  }

  //console.log(query);
  req.query.sort = '-starts_on';
  const features = new APIFeatures(Internship.find(query), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  let internship = await features.query;
  internship = internship.map(data => {
    const active = data.ends_on;
    if (active >= Date.now()) {
      //console.log(active);
      //console.log(Date.now());
      return data;
    }
  });
  internship = internship.filter(data => data !== undefined);
  //console.log('hi', internship);
  res.status(200).json({
    status: 'Success',
    results: internship.length,
    data: {
      doc: internship
    }
  });
});

exports.getInternshipByCompanyId = catchAsync(async (req, res, next) => {
  req.query.sort = '-starts_on';
  const features = new APIFeatures(
    Internship.find({ company: req.params.id }),
    req.query
  )
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const internship = await features.query;
  if (!internship) {
    //console.log('hey');
    return next(new AppError('No internship found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    results: internship.length,
    data: { internship }
  });
});

exports.deleteHostedInternship = catchAsync(async (req, res, next) => {
  await Internship.findByIdAndUpdate(req.params.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getAllInternships = factory.getAll(Internship);
exports.getInternshipById = factory.getOne(Internship);
exports.createInternship = factory.createOne(Internship);
exports.updateInternship = factory.updateOne(Internship);
exports.deleteInternship = factory.deleteOne(Internship);
