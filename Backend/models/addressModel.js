const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  locality: {
    type: String,
    required: [true, 'Please provide your Locality'],
    maxlength: [50, 'Please enter valid locality'],
    minlength: [5, 'Please enter valid locality']
  },
  city: {
    type: String,
    required: [true, 'Please provide your City'],
    maxlength: [15, 'Please enter valid City']
  },
  district: {
    type: String,
    maxlength: [15, 'Please enter valid City']
  },
  state: {
    type: String,
    required: [true, 'Please provide your State'],
    maxlength: [20, 'Sate name must be less than 20 characters'],
    minlength: [3, 'Please enter valid state']
  },
  country: {
    type: String,
    required: [true, 'Please provide your Country'],
    maxlength: [63, 'Characters must be less than 63 characters'],
    minlength: [3, 'Characters must be greater than 3 characters']
  },
  slug: String,
  pincode: {
    type: Number,
    required: [true, 'Please provide your Pincode'],
    maxlength: [6, 'Pincode is invalid'],
    minlength: [2, 'Pincode is invalid']
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

addressSchema.pre(/^find/, function (next) {
  //this points to current query
  this.populate({
    path: 'user',
    select: '-__v'
  });
  next();
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;