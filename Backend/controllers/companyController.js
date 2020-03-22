const Company = require('./../models/companyModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getCompanyByIdUser = catchAsync(async (req, res, next) => {
  const company = await Company.find({ user: req.params.id });
  if (!company) {
    //console.log('hey');
    return next(new AppError('No Company found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { company }
  });
});

exports.getAllCompanies = factory.getAll(Company);
exports.getCompanyById = factory.getOne(Company);
exports.createCompany = factory.createOne(Company);
exports.updateCompany = factory.updateOne(Company);
exports.deleteCompany = factory.deleteOne(Company);
