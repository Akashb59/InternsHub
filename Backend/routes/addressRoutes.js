const express = require('express');

const router = express.Router();
const addressController = require('./../controllers/addressController');
const authController = require('./../controllers/authController');

router.use(authController.protect);
router
  .route('/')
  .get(authController.restrictTo('Admin'), addressController.getAllAddresses)
  .post(
    authController.restrictTo('Admin', 'Student', 'Company'),
    addressController.createAddress
  );
router.use(authController.restrictTo('Admin', 'Student', 'Company'));
router
  .route('/:id')
  .get(addressController.getAddressById)
  .patch(addressController.updateAddress)
  .delete(addressController.deleteAddress);

module.exports = router;
