const mongoose = require('mongoose');
const validator = require('validator');

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },

    gst_no: {
      type: String,
      required: [true, 'Please provide your GST No'],
      unique: true,
      maxlength: [16, 'Please Enter valid GST number!'],
      minlength: [16, 'Please Enter valid GST number!']
    },
    technology: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SkillTypeMaster'
      }
    ],
    aboutCompany: {
      type: String,
      maxlength: [500, 'details are large!'],
      minlength: [20, 'add few details!']
    },
    website: {
      type: String,
      required: true,
      maxlength: [40, 'Please Enter valid website address!'],
      minlength: [10, 'Please Enter valid website address!'],
      validate: [validator.isURL, 'Please enter valid website!']
    },
    slug: String,
    address: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
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
  });
  next();
});
const Company = mongoose.model('Company', companySchema);
module.exports = Company;

//image
