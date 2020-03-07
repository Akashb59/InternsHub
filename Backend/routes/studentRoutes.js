const express = require('express');

const router = express.Router();
const studentController = require('./../controllers/studentController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    studentController.getAllStudents
  )
  .post(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    studentController.createStudent
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    studentController.getStudentById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    studentController.updateStudent
  )
  .put(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    studentController.updateStudent
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    studentController.deleteStudent
  );
router
  .route('/user/:id')
  .patch(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    studentController.updateStudentAddCollege
  )
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    studentController.getStudentByIdUser
  );
module.exports = router;
