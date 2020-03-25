const mongoose = require('mongoose');
const validator = require('validator');

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },

    gst_no: {
      type: String,
      required: [true, 'Please provide your GST No'],
      unique: true,
      maxlength: [15, 'Please Enter valid GST number!'],
      minlength: [15, 'Please Enter valid GST number!']
    },
    technology: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SkillTypeMaster'
      }
    ],
    aboutCompany: {
      type: String,
      maxlength: [400, 'details are large!'],
      minlength: [100, 'add some more details!']
    },
    website: {
      type: String,
      required: [true, 'Please provide your Website Info'],
      maxlength: [40, 'Please Enter valid website address!'],
      minlength: [10, 'Please Enter valid website address!'],
      validate: [validator.isURL, 'Please enter valid website!']
    },
    slug: String,
    address: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Address',
        required: true
      }
    ],
    establishedYear: {
      type: Date,
      default: Date.now()
    }
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

companySchema.pre(/^find/, function(next) {
  //this points to current query
  this.populate({
    path: 'user address technology',
    select: '-__v -user'
  }).populate({
    path: ' user',
    select: '-id -_id -__v -roleType -slug -user'
  });
  next();
});
const Company = mongoose.model('Company', companySchema);
module.exports = Company;

//image
