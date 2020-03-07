const express = require('express');

const router = express.Router();
const skillTypeMasterController = require('./../controllers/skillTypeMasterController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
    skillTypeMasterController.getAllSkillTypeMasters
  )
  .post(
    authController.protect,
    authController.restrictTo('Admin'),
    skillTypeMasterController.createSkillTypeMaster
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
    skillTypeMasterController.getSkillTypeMasterById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin'),
    skillTypeMasterController.updateSkillTypeMaster
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin'),
    skillTypeMasterController.deleteSkillTypeMaster
  );

module.exports = router;
