const Placementcell = require('../models/placementCellModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllPlacementcells = catchAsync(async (req, res, next) => {
  //Execute Query
  const features = new APIFeatures(Placementcell.find(), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const placementcell = await features.query;
  //Send Response
  res.status(200).json({
    status: 'Success',
    results: placementcell.length,
    data: { placementcell }
  });
});
exports.getPlacementcellById = catchAsync(async (req, res, next) => {
  const placementcell = await Placementcell.findById(req.params.id);
  if (!Placementcell) {
    console.log('hey');
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { placementcell }
  });
});

exports.createPlacementcell = catchAsync(async (req, res, next) => {
  const newPlacementcell = await Placementcell.create(req.body);
  //Intern.findOne({_id:req.params.id})
  console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      Placementcell: newPlacementcell
    }
  });
});

exports.updatePlacementcell = catchAsync(async (req, res, next) => {
  const placementcell = await Placementcell.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
      //re validate for each update
    }
  );
  if (!placementcell) {
    console.log('hey');
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      placementcell
    }
  });
});

exports.deletePlacementcell = catchAsync(async (req, res, next) => {
  const placementcell = await Placementcell.findByIdAndDelete(req.params.id);
  if (!placementcell) {
    console.log('hey');
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: {
      placementcell
    }
  });
});
