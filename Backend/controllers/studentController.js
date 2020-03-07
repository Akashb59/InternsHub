const Student = require('./../models/studentModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllStudents = catchAsync(async (req, res, next) => {
  //Execute Query
  const features = new APIFeatures(Student.find(), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const student = await features.query;
  //Send Response
  res.status(200).json({
    status: 'Success',
    results: student.length,
    data: { student }
  });
});
exports.getStudentById = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    console.log('hey');
    return next(new AppError('No student found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { student }
  });
});
exports.getStudentByIdUser = catchAsync(async (req, res, next) => {
  const student = await Student.find({ user: req.params.id });
  console.log(student);
  if (!student) {
    //console.log('hey');
    return next(new AppError('No Student found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { student }
  });
});

exports.createStudent = catchAsync(async (req, res, next) => {
  const newStudent = await Student.create(req.body);
  //Student.findOne({_id:req.params.id})
  console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      Student: newStudent
    }
  });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
    //re validate for each update
  });
  if (!student) {
    console.log('hey');
    return next(new AppError('No student found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      student
    }
  });
});

exports.updateStudentAddCollege = catchAsync(async (req, res, next) => {
  console.log(req.body, req.params.id);
  const student = await Student.findOneAndUpdate(
    { user: req.params.id },
    {
      $push: { college: req.body.college }
    },
    {
      new: true,
      runValidators: true
      //re validate for each update
    }
  );
  if (!student) {
    return next(new AppError('No student found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      student
    }
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    console.log('hey');
    return next(new AppError('No student found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: {
      student
    }
  });
});
