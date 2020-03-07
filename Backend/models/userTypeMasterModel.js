const mongoose = require('mongoose');

const userTypeMasterSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      unique: true
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const UserTypeMaster = mongoose.model('UserTypeMaster', userTypeMasterSchema);

module.exports = UserTypeMaster;
