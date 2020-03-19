const express = require('express');

const router = express.Router();
const enquiryController = require('./../controllers/enquiryController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    enquiryController.getAllEnquiries
  )
  .post(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    enquiryController.createEnquiry
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Company', 'Student'),
    enquiryController.getEnquiryById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin', 'Company', 'Student'),
    enquiryController.updateEnquiry
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    enquiryController.deleteEnquiry
  );
router
  .route('/company/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Company', 'Student'),
    enquiryController.getEnquiryByIdCompany
  );
module.exports = router;
