const mongoose = require('mongoose');
const Company = require('./companyModel');

const reviewSchema = new mongoose.Schema(
  {
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
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: ['Company', 'Review must belong to an Company']
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

reviewSchema.pre(/^find/, function(next) {
  //this points to current query
  this.populate({
    path: 'user',
    select: '-id -roleType -slug -_id'
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function(companyId) {
  const stats = await this.aggregate([
    {
      $match: { company: companyId }
    },
    {
      $group: {
        _id: '$company',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Company.findByIdAndUpdate(companyId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Company.findByIdAndUpdate(companyId, {
      ratingsQuantity: 0,
      ratingsAverage: 4
    });
  }
};

reviewSchema.post('save', function() {
  // this points to current review
  this.constructor.calcAverageRatings(this.company);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  //console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.company);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
