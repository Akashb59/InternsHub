const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Please enter user details'],
      ref: 'User'
    },
    student: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Please enter student details'],
      ref: 'Student'
    },
    company: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Please enter company details'],
      ref: 'Company'
    },
    internship: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Please enter internship details'],
      ref: 'Internship'
    },
    accepted: {
      type: String,
      default: 'No',
      enum: {
        values: ['Yes', 'No'],
        message: 'accepted is either Yes or No'
      }
    },
    completed: {
      type: String,
      default: 'No',
      enum: {
        values: ['Yes', 'No'],
        message: 'completed is either Yes or No'
      }
    },
    reqAt: {
      type: Date,
      required: true,
      default: Date.now()
    },
    reqMessage: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [40, 'Information size exceeded!'],
      minlength: [10, 'add more Information!']
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

enquirySchema.pre(/^find/, function(next) {
  //this points to current query
  this.populate({
    path: 'user internship student company',
    select: '-__v'
  });
  next();
});
const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;

//image
