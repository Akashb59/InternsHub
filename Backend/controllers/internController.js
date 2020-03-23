const Intern = require('./../models/internModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
/* exports.checkID = (req, res, next, val) => {
  console.log(`Intern id is ${val}`);
  if (req.params.id * 1 > interns.length) {
    return req.status(404).json({
      status: 'fail',
      message: 'invalid ID'
    });
  }
  next();
}; */
/* exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing Name'
    });
  }
  next();
}; */
exports.aliasTopInterns = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-age,name';
  req.query.fields = 'name,age';
  next();
};
//Build Query
//1.Filtering
//2.Sorting
//3.Field Limiting
//4.Pagination
exports.getAllInterns = catchAsync(async (req, res, next) => {
  //Execute Query
  const features = new APIFeatures(Intern.find(), req.query)
    .filter()
    .sorter()
    .limitFields()
    .paginate();

  const intern = await features.query;
  //Send Response
  res.status(200).json({
    status: 'Success',
    results: intern.length,
    data: { intern }
  });
});
exports.getInternById = catchAsync(async (req, res, next) => {
  const intern = await Intern.findById(req.params.id);
  if (!intern) {
    //console.log('hey');
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { intern }
  });
});

exports.createIntern = catchAsync(async (req, res, next) => {
  const newIntern = await Intern.create(req.body);
  //Intern.findOne({_id:req.params.id})
  //console.log(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      Intern: newIntern
    }
  });
});

/* const testIntern = new Intern({
    name: 'intern 1',
    age: 20
  });

  testIntern
    .save()
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.log('Error', err);
    }); */
/* try {
    
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data sent',
      error: err
    });
  }
*/
exports.updateIntern = catchAsync(async (req, res, next) => {
  const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
    //re validate for each update
  });
  if (!intern) {
    //console.log('hey');
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      intern
    }
  });
});

exports.deleteIntern = catchAsync(async (req, res, next) => {
  const intern = await Intern.findByIdAndDelete(req.params.id);
  if (!intern) {
    //console.log('hey');
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: {
      intern
    }
  });
});

exports.getInternStats = catchAsync(async (req, res, next) => {
  const stats = await Intern.aggregate([
    //Refer Documentation mongoDB
    {
      $match: { age: { $gte: 18 } }
    },
    {
      $group: {
        _id: '$age',
        //_id: null,
        numInterns: { $sum: 1 },
        TotalSumAges: { $sum: '$age' },
        avgAge: { $avg: '$age' },
        minAge: { $min: '$age' },
        maxAge: { $max: '$age' }
      }
    },
    {
      $sort: { avgAge: 1 }
    },
    {
      //Multiple times same aggregation
      $match: {
        _id: { $ne: 18 }
      }
    }
  ]);
  res.status(200).json({
    status: 'Success',
    data: {
      stats
    }
  });
});
