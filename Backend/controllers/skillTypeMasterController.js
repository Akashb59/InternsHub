const SkillTypeMaster = require('./../models/skillTypeMasterModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllSkillTypeMasters = catchAsync(async (req, res, next) => {
  //Execute Query
  const features = new APIFeatures(SkillTypeMaster.find(), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const skillTypeMaster = await features.query;
  //Send Response
  res.status(200).json({
    status: 'Success',
    results: skillTypeMaster.length,
    data: { skillTypeMaster }
  });
});
exports.getSkillTypeMasterById = catchAsync(async (req, res, next) => {
  const skillTypeMaster = await SkillTypeMaster.findById(req.params.id);
  if (!skillTypeMaster) {
    console.log('hey');
    return next(new AppError('No skillTypeMaster found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { skillTypeMaster }
  });
});

exports.createSkillTypeMaster = catchAsync(async (req, res, next) => {
  const newSkillTypeMaster = await SkillTypeMaster.create(req.body);
  //SkillTypeMaster.findOne({_id:req.params.id})
  console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      SkillTypeMaster: newSkillTypeMaster
    }
  });
});

exports.updateSkillTypeMaster = catchAsync(async (req, res, next) => {
  const skillTypeMaster = await SkillTypeMaster.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
      //re validate for each update
    }
  );
  if (!skillTypeMaster) {
    console.log('hey');
    return next(new AppError('No skillTypeMaster found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      skillTypeMaster
    }
  });
});

exports.deleteSkillTypeMaster = catchAsync(async (req, res, next) => {
  const skillTypeMaster = await SkillTypeMaster.findByIdAndDelete(
    req.params.id
  );
  if (!skillTypeMaster) {
    console.log('hey');
    return next(new AppError('No skillTypeMaster found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: {
      skillTypeMaster
    }
  });
});
