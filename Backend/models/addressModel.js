const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    locality: {
      type: String,
      required: [true, 'Please provide your Locality'],
      maxlength: [50, 'Please enter valid Locality'],
      minlength: [10, 'Please enter valid Locality']
    },
    city: {
      type: String,
      required: [true, 'Please provide your City'],
      maxlength: [30, 'City name must be less than 30 characters'],
      minlength: [3, 'Please enter valid City']
    },
    district: {
      type: String,
      maxlength: [15, 'Please enter valid District'],
      minlength: [3, 'Please enter valid District']
    },
    state: {
      type: String,
      required: [true, 'Please provide your State'],
      maxlength: [30, 'State name must be less than 30 characters'],
      minlength: [3, 'Please enter valid State']
    },
    country: {
      type: String,
      required: [true, 'Please provide your Country'],
      maxlength: [30, 'Characters must be less than 30 characters'],
      minlength: [3, 'Please enter valid Country']
    },
    slug: String,
    pincode: {
      type: Number,
      required: [true, 'Please provide your Pincode'],
      maxlength: [6, 'Please enter valid Pincode'],
      minlength: [6, 'Please enter valid Pincode']
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

addressSchema.pre(/^find/, function(next) {
  //this points to current query
  this.populate({
    path: 'user',
    select: '-__v -slug -roleType'
  });
  next();
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
