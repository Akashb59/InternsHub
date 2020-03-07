const express = require('express');

const router = express.Router();
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Company'),
    reviewController.getAllReviews
  )
  .post(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'PlacementCell'),
    reviewController.createReview
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'PlacementCell', 'Student', 'Company'),
    reviewController.getReviewById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin', 'PlacementCell', 'Student'),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin', 'PlacementCell', 'Student'),
    reviewController.deleteReview
  );

module.exports = router;
