const express = require('express');

const router = express.Router();
const companyController = require('./../controllers/companyController');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('Admin'), companyController.getAllCompanies)
  .post(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    companyController.createCompany
  );

router.use(authController.restrictTo('Admin', 'Company'));

router
  .route('/:id')
  .get(companyController.getCompanyById)
  .patch(companyController.updateCompany)
  .delete(companyController.deleteCompany);
router.route('/user/:id').get(companyController.getCompanyByIdUser);
module.exports = router;
