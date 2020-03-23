const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signUp', authController.signup);
router.post('/logIn', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router
  .route('/')
  .get(authController.restrictTo('Admin'), userController.getAllUsers);
router.use(
  authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell')
);
router.patch(
  '/updateMyPassword',

  authController.updatePassword
);
router.patch(
  '/updateMe',

  userController.updateMe
);
router.delete(
  '/deleteMe',

  userController.deleteMe
);

router.route('/').post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
