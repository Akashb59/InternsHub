const express = require('express');

const router = express.Router();
const placementCellController = require('./../controllers/placementCellController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    placementCellController.getAllPlacementcells
  )
  .post(
    authController.protect,
    authController.restrictTo('Admin', 'PlacementCell'),
    placementCellController.createPlacementcell
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin', 'PlacementCell'),
    placementCellController.getPlacementcellById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin', 'PlacementCell'),
    placementCellController.updatePlacementcell
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin', 'PlacementCell'),
    placementCellController.deletePlacementcell
  );

module.exports = router;
