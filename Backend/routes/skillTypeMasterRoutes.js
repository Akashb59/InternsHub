const express = require('express');

const router = express.Router();
const skillTypeMasterController = require('./../controllers/skillTypeMasterController');
const authController = require('./../controllers/authController');

router.use(authController.protect);
router
  .route('/')
  .get(
    authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
    skillTypeMasterController.getAllSkillTypeMasters
  )
  .post(
    authController.restrictTo('Admin'),
    skillTypeMasterController.createSkillTypeMaster
  );

router
  .route('/:id')
  .get(
    authController.restrictTo('Admin', 'Student', 'Company', 'PlacementCell'),
    skillTypeMasterController.getSkillTypeMasterById
  );

router.use(authController.restrictTo('Admin'));
router
  .route('/:id')
  .patch(skillTypeMasterController.updateSkillTypeMaster)
  .delete(skillTypeMasterController.deleteSkillTypeMaster);

module.exports = router;
