const express = require('express');

const router = express.Router();
const enquiryController = require('./../controllers/enquiryController');
const authController = require('./../controllers/authController');

router.use(authController.protect);
router
  .route('/')
  .get(authController.restrictTo('Admin'), enquiryController.getAllEnquiries)
  .post(
    authController.restrictTo('Admin', 'Student'),
    enquiryController.createEnquiry
  );
router
  .route('/:id')
  .delete(
    authController.restrictTo('Admin', 'Student'),
    enquiryController.deleteEnquiry
  );
router.use(authController.restrictTo('Admin', 'Company', 'Student'));

router
  .route('/:id')
  .get(enquiryController.getEnquiryById)
  .patch(enquiryController.updateEnquiry);

router.route('/company/:id').get(enquiryController.getEnquiryByIdCompany);
router.route('/student/:id').get(enquiryController.getEnquiryByIdStudent);
module.exports = router;
