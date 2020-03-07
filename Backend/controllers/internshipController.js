const Internship = require('./../models/internshipModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getInternshipsFilter = catchAsync(async (req, res, next) => {
  console.log('Hello');
  let query;
  let stip = [];
  let dur = [];
  let arr = [];
  console.log(req.body);

  req.body.stipend[0] === true ? stip.push({ stipend: 0 }) : {};
  req.body.stipend[1] === true
    ? stip.push({
        $and: [{ stipend: { $gte: 0 } }, { stipend: { $lte: 5000 } }]
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

  console.log(query);
  const features = new APIFeatures(Internship.find(query), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const internship = await features.query;

  //console.log('hi', internship);
  res.status(200).json({
    status: 'Success',
    results: internship.length,
    data: {
      stats: internship
    }
  });
});
exports.getAllInternships = catchAsync(async (req, res, next) => {
  //Execute Query
  const features = new APIFeatures(Internship.find(), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const internship = await features.query;
  //Send Response
  res.status(200).json({
    status: 'Success',
    results: internship.length,
    data: { internship }
  });
});
exports.getInternshipById = catchAsync(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id);
  if (!internship) {
    //console.log('hey');
    return next(new AppError('No internship found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { internship }
  });
});

exports.getInternshipByCompanyId = catchAsync(async (req, res, next) => {
  const internship = await Internship.find({ company: req.params.id });
  if (!internship) {
    //console.log('hey');
    return next(new AppError('No internship found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { internship }
  });
});

exports.createInternship = catchAsync(async (req, res, next) => {
  const newInternship = await Internship.create(req.body);
  //Internship.findOne({_id:req.params.id})
  // console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      Internship: newInternship
    }
  });
});

exports.updateInternship = catchAsync(async (req, res, next) => {
  const internship = await Internship.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
      //re validate for each update
    }
  );
  if (!internship) {
    // console.log('hey');
    return next(new AppError('No internship found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      internship
    }
  });
});

exports.deleteInternship = catchAsync(async (req, res, next) => {
  const internship = await Internship.findByIdAndDelete(req.params.id);
  if (!internship) {
    // console.log('hey');
    return next(new AppError('No internship found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: {
      internship
    }
  });
});

exports.deleteHostedInternship = catchAsync(async (req, res, next) => {
  await Internship.findByIdAndUpdate(req.params.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});
