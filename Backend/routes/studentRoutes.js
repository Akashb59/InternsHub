const express = require('express');

const router = express.Router();
const studentController = require('./../controllers/studentController');
const authController = require('./../controllers/authController');

router
  .route('/uploadResume/:id')
  .patch(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    studentController.uploadStudentResume,
    studentController.updateStudentResume
  );
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
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Student'),
    studentController.getStudentByIdUser
  );
// router
// .route('/resume/:id')
// .patch(
//   authController.protect,
//   authController.restrictTo('Admin', 'Student'),
//   studentController.updateStudentAddCollege
// );
module.exports = router;
