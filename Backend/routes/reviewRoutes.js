const express = require('express');

const router = express.Router();
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

router.use(authController.protect);
router
  .route('/')
  .get(
    authController.restrictTo('Admin', 'Company'),
    reviewController.getAllReviews
  )
  .post(
    authController.restrictTo('Admin', 'Student', 'PlacementCell'),
    reviewController.createReview
  );

router
  .route('/:id')
  .get(
    authController.restrictTo('Admin', 'PlacementCell', 'Student', 'Company'),
    reviewController.getReviewById
  )
  .patch(
    authController.restrictTo('Admin', 'PlacementCell', 'Student'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('Admin', 'PlacementCell', 'Student'),
    reviewController.deleteReview
  );

module.exports = router;
