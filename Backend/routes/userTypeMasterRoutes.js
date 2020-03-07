const express = require('express');
const userTypeMasterController = require('../controllers/userTypeMasterController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(userTypeMasterController.getAllUserTypeMasters)
  .post(
    authController.protect,
    authController.restrictTo('Admin'),
    userTypeMasterController.createUserTypeMaster
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
    userTypeMasterController.getUserTypeMasterById
  );
module.exports = router;
