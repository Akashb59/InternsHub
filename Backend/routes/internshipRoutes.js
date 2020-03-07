const express = require('express');

const router = express.Router();
const internshipController = require('./../controllers/internshipController');
const authController = require('./../controllers/authController');

router
  .route('/internshipFilter')
  .post(internshipController.getInternshipsFilter);
router.delete(
  '/deleteHostedInternship/:id',
  authController.protect,
  authController.restrictTo('Admin', 'Company'),
  internshipController.deleteHostedInternship
);
router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    internshipController.getAllInternships
  )
  .post(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    internshipController.createInternship
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company'),
    internshipController.getInternshipById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    internshipController.updateInternship
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    internshipController.deleteInternship
  );
router
  .route('/company/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    internshipController.getInternshipByCompanyId
  );

module.exports = router;
