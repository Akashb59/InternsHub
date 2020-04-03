const express = require('express');
const userTypeMasterController = require('../controllers/userTypeMasterController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(userTypeMasterController.getAllUserTypeMasters);

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.restrictTo('Admin'),
    userTypeMasterController.createUserTypeMaster
  );

router
  .route('/:id')
  .get(
    authController.restrictTo('Admin', 'Student', 'Company'),
    userTypeMasterController.getUserTypeMasterById
  );
module.exports = router;
