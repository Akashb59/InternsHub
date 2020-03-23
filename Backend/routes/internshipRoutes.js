const express = require('express');

const router = express.Router();
const internshipController = require('./../controllers/internshipController');
const authController = require('./../controllers/authController');

router
  .route('/internshipFilter')
  .post(internshipController.getInternshipsFilter);

router.use(authController.protect);
router.delete(
  '/deleteHostedInternship/:id',

  authController.restrictTo('Admin', 'Company'),
  internshipController.deleteHostedInternship
);
router
  .route('/')
  .get(
    authController.restrictTo('Admin', 'Student'),
    internshipController.getAllInternships
  );

router
  .route('/:id')
  .get(
    authController.restrictTo('Admin', 'Student', 'Company'),
    internshipController.getInternshipById
  );

router.use(authController.restrictTo('Admin', 'Company'));
router.route('/').post(internshipController.createInternship);
router
  .route('/:id')
  .patch(internshipController.updateInternship)
  .delete(internshipController.deleteInternship);
router.route('/company/:id').get(internshipController.getInternshipByCompanyId);

module.exports = router;
