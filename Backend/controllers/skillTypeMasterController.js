const SkillTypeMaster = require('./../models/skillTypeMasterModel');
const factory = require('./handlerFactory');

exports.getAllSkillTypeMasters = factory.getAll(SkillTypeMaster);
exports.getSkillTypeMasterById = factory.getOne(SkillTypeMaster);
exports.createSkillTypeMaster = factory.createOne(SkillTypeMaster);
exports.updateSkillTypeMaster = factory.updateOne(SkillTypeMaster);
exports.deleteSkillTypeMaster = factory.deleteOne(SkillTypeMaster);
