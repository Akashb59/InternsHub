const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true
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
      type: Number,
      required: [true, 'Please provide Duration for Internship']
    },
    stipend: {
      type: Number,
      required: [true, 'Please provide Stipend for Internship']
    },
    posted_on: {
      type: Date,
      default: Date.now()
    },
    starts_on: {
      type: Date,
      required: [true, 'Please provide Start Date for Internship']
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
internshipSchema.virtual('ends_on').get(function() {
  return this.starts_on.getTime() + 30 * 24 * 60 * 60 * 1000 * this.duration;
});
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
  })
    .populate({
      path: 'requiredSkills',
      select: '-__v -slug -user',
      options: {
        sort: 'skill_name'
      }
    })
    .populate({
      path: 'user',
      select: '-__v -slug -id -_id'
    });
  next();
});

const Internship = mongoose.model('Internship', internshipSchema);
module.exports = Internship;
