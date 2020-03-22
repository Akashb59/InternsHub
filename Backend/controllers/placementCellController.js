const Placementcell = require('../models/placementCellModel');
const factory = require('./handlerFactory');

exports.getAllPlacementcells = factory.getAll(Placementcell);
exports.getPlacementcellById = factory.getOne(Placementcell);
exports.createPlacementcell = factory.createOne(Placementcell);
exports.updatePlacementcell = factory.updateOne(Placementcell);
exports.deletePlacementcell = factory.deleteOne(Placementcell);
