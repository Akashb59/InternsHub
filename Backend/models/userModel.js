const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const UserTypeMaster = require('./userTypeMasterModel');

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please provide your name'],
      maxlength: [50, 'A  name must have less or equal to 50']
    },
    email: {
      type: String,
      required: [true, 'Please provide your Email'],
      validate: [validator.isEmail, 'Please provide a valid Email'],
      unique: true,
      lowercase: true
    },
    roleType: {
      type: mongoose.Schema.ObjectId,
      ref: 'UserTypeMaster'
    },
    password: {
      type: String,
      required: [true, 'Please provide a Password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your Password'],
      validate: {
        //This only works on CREATE and SAVE
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords do not match!'
      }
    },
    phoneNumber: {
      type: Number,
      maxlength: [10, 'A Enter a valid Phone Number']
    },
    role: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
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
//Document middleware
userSchema.pre('save', async function(next) {
  //Only run this function if password was modified
  if (!this.isModified('password')) return next();
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

/* userSchema.pre('save', async function(next) {
  const rolePromises = this.role.map(
    async id => await userTypeMasters.findById(id)
  );
  console.log(rolePromises);
  this.role = await Promise.all(rolePromises);
  next();
}); */

//Query middleware
userSchema.pre(/^find/, function(next) {
  //this points to current query
  this.find({
    active: {
      $ne: false
    }
  });
  next();
});
userSchema.pre(/^find/, function(next) {
  //this points to current query
  this.populate({
    path: 'roleType',
    select: '-__v'
  });
  next();
});

//Functions
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp; // 300 < 200
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log(
    {
      resetToken
    },
    this.passwordResetToken
  );
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
