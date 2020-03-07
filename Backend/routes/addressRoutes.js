const express = require('express');

const router = express.Router();
const addressController = require('./../controllers/addressController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    addressController.getAllAddresses
  )
  .post(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
    addressController.createAddress
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company'),
    addressController.getAddressById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company'),
    addressController.updateAddress
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company'),
    addressController.deleteAddress
  );

module.exports = router;
