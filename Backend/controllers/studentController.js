const Student = require('./../models/studentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Resume');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `student-${req.params.id}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  //console.log(file, ' ', req.headers.size);
  if (
    file.mimetype.startsWith('application/pdf') &&
    (file.size || req.headers.size < 1000000)
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Invlaid file or size. Please upload a PDF file smaller than 1MB only!',
        400
      ),
      false
    );
  }
};
const maxSize = 1 * 1000 * 1000;

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: maxSize }
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.uploadStudentResume = upload.single('resume');

exports.updateStudentResume = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'academic_details',
    'personal_details'
  );
  if (req.file) filteredBody.resume = req.file.filename;
  //console.log(req.params.id);
  //console.log(req.file);
  //console.log(req.body);

  //3.Update user document
  //console.log(filteredBody.resume);
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).json({
    status: 'Success',
    data: { updatedStudent }
  });
});

exports.getStudentByIdUser = catchAsync(async (req, res, next) => {
  const student = await Student.find({ user: req.params.id }).populate(
    'address'
  );
  //console.log(student);
  if (!student) {
    //console.log('hey');
    return next(new AppError('No Student found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { student }
  });
});

exports.updateStudentAddCollege = catchAsync(async (req, res, next) => {
  //console.log(req.body, req.params.id);
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

exports.getAllStudents = factory.getAll(Student);
exports.getStudentById = factory.getOne(Student, 'address');
exports.createStudent = factory.createOne(Student);
exports.updateStudent = factory.updateOne(Student);
exports.deleteStudent = factory.deleteOne(Student);
