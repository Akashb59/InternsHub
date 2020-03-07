const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();
const internController = require('./../controllers/internController');

//router.param('id', internController.checkID);

//Write other middleware routes for authorization of doing something
router
  .route('/top-rated-interns')
  .get(internController.aliasTopInterns, internController.getAllInterns);

router.route('/intern-stats').get(internController.getInternStats);
router
  .route('/')
  .get(authController.protect, internController.getAllInterns)
  .post(internController.createIntern);

router
  .route('/:id')
  .get(internController.getInternById)
  .patch(internController.updateIntern)
  .delete(
    authController.protect,
    authController.restrictTo('Student'),
    internController.deleteIntern
  );

module.exports = router;
