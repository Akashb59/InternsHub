const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signUp', authController.signup);
router.post('/logIn', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
  authController.updatePassword
);
router.patch(
  '/updateMe',
  authController.protect,
  authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
  userController.updateMe
);
router.delete(
  '/deleteMe',
  authController.protect,
  authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
  userController.deleteMe
);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
    userController.createUser
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
    userController.getUserById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
    userController.deleteUser
  );

module.exports = router;
