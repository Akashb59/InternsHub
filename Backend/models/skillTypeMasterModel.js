const mongoose = require('mongoose');

const skillTypeMasterSchema = new mongoose.Schema(
  {
    skill_name: {
      type: String,
      required: [true, 'Please Enter the Skills'],
      maxlength: [30, 'A skill name must have less or equal to 30 Characters'],
      unique: [true, 'Skill already exists']
    },
    slug: String
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

const SkillTypeMaster = mongoose.model(
  'SkillTypeMaster',
  skillTypeMasterSchema
);
module.exports = SkillTypeMaster;
