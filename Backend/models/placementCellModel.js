const mongoose = require('mongoose');

const placementCellSchema = new mongoose.Schema({
  college: {
    type: String,
    required: [true, 'Please enter your College name'],
    maxlength: [30, 'College id cant exceed 30 characters']
  },

  no_of_students: {
    type: Number,
    max: [500, 'Number of student should be less than 500'],
    min: [10, 'Request for 10 minimum students']
  },
  description: {
    type: String,
    maxlength: [50, 'Maximum limit for description reached'],
    minlength: [5, 'Please add description']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  slug: String
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

placementCellSchema.pre(/^find/, function (next) {
  //this points to current query
  this.populate({
    path: 'user',
    select: '-__v'
  });
  next();
});

const placementCell = mongoose.model('PlacementCell', placementCellSchema);
module.exports = placementCell;