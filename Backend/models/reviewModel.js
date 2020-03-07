const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  internship: {
    type: mongoose.Schema.ObjectId,
    ref: 'Internship',
    required: ['Internship', 'Review must belong to an Internship']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: ['User', 'Review must belong to an User']
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

reviewSchema.pre(/^find/, function (next) {
  //this points to current query
  this.populate({
    path: 'user internship',
    select: '-__v'
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;