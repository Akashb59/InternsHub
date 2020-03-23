const express = require('express');

const router = express.Router();
const studentController = require('./../controllers/studentController');
const authController = require('./../controllers/authController');

router.use(authController.protect);
router
  .route('/uploadResume/:id')
  .patch(
    authController.restrictTo('Admin', 'Student'),
    studentController.uploadStudentResume,
    studentController.updateStudentResume
  );
router
  .route('/')
  .get(authController.restrictTo('Admin'), studentController.getAllStudents)
  .post(
    authController.restrictTo('Admin', 'Student'),
    studentController.createStudent
  );

router.use(authController.restrictTo('Admin', 'Student'));
router
  .route('/:id')
  .get(studentController.getStudentById)
  .patch(studentController.updateStudent)
  .put(studentController.updateStudent)
  .delete(studentController.deleteStudent);
router.route('/user/:id').get(studentController.getStudentByIdUser);
// router
// .route('/resume/:id')
// .patch(
//   authController.protect,
//   authController.restrictTo('Admin', 'Student'),
//   studentController.updateStudentAddCollege
// );
module.exports = router;
