const express = require('express');

const router = express.Router();
const placementCellController = require('./../controllers/placementCellController');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(
    authController.restrictTo('Admin'),
    placementCellController.getAllPlacementcells
  )
  .post(
    authController.restrictTo('Admin', 'PlacementCell'),
    placementCellController.createPlacementcell
  );

router.use(authController.restrictTo('Admin', 'PlacementCell'));
router
  .route('/:id')
  .get(placementCellController.getPlacementcellById)
  .patch(placementCellController.updatePlacementcell)
  .delete(placementCellController.deletePlacementcell);

module.exports = router;
