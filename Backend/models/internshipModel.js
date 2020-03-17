const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company'
    },
    title: {
      type: String,
      required: [true, 'Please provide the Title of Internship'],
      maxlength: [50, 'A title  must have less or equal to 50 characters '],
      minlength: [5, 'A title  must have more or equal to 5']
    },
    requiredSkills: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SkillTypeMaster'
      }
    ],
    description: {
      type: Array
      // maxlength: [200, 'Description size exceeded'],
      // minlength: [20, 'Enter more Description']
    },
    duration: {
      type: Number
    },
    stipend: {
      type: Number
    },
    posted_on: {
      type: Date,
      default: Date.now()
    },
    starts_on: {
      type: Date
    },
    intended_participants: {
      type: Array
      // maxlength: [200, 'Number of characters exceeded']
    },

    categories: {
      type: String,
      enum: {
        values: ['Fulltime', 'Parttime'],
        message: 'Categories is either Full Time or Part Time'
      }
    },
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    type_of_internship: {
      type: String,
      enum: {
        values: ['Paid', 'Free'],
        message: 'categories is either Paid or Free'
      }
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
internshipSchema.pre(/^find/, function(next) {
  //this points to current query
  this.find({
    active: {
      $ne: false
    }
  });
  next();
});
internshipSchema.pre(/^find/, function(next) {
  //this points to current query
  this.populate({
    path: 'company requiredSkills',
    select: '-__v'
  });
  next();
});

const Internship = mongoose.model('Internship', internshipSchema);
module.exports = Internship;
