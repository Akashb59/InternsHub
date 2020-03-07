const express = require('express');

const router = express.Router();
const companyController = require('./../controllers/companyController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    companyController.getAllCompanies
  )
  .post(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    companyController.createCompany
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    companyController.getCompanyById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    companyController.updateCompany
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    companyController.deleteCompany
  );
router
  .route('/user/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    companyController.getCompanyByIdUser
  );
module.exports = router;
