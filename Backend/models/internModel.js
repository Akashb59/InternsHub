const mongoose = require('mongoose');
const slugify = require('slugify');
//const validator = require('validator');

const internSchema = new mongoose.Schema(
  {
    //validate:{validator:function(val)=>{ return val<this.price;}, message:"message"}
    //This only points to the current doc on the new document creation
    name: {
      type: String,
      required: [true, 'Intern name'],
      unique: true,
      // not useful validate: [validator.isAlpha, 'Only Characters allowed'],
      maxlength: [50, 'Name should be less than 50 characters']
    },
    slug: {
      type: String
    },
    age: {
      type: Number,
      min: [15, 'Minimum age is 15'],
      max: [70, 'Maximum age is 70']
    },
    secretIntern: {
      type: Boolean,
      default: false,
      enum: { values: ['true', 'false'], message: 'Only true or false ' }
      //Strings only, set of possible inputs
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      min: Date.now(),
      select: false
    }
  },
  //Virtual property, cannot be used for queries as it's not present in the schema
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
internSchema.virtual('adultAge').get(function() {
  if (this.age >= 18) return true;
  return false;
});
//Document Middleware, runs before save and create (multiple allowed)
internSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/* internSchema.post('save', function(doc, next) {
  console.log(doc);
  next();
});
 */

//Query Middleware
internSchema.pre(/^find/, function(next) {
  this.find({ secretIntern: { $ne: true } });
  this.start = Date.now();
  next();
});

internSchema.post(/^find/, function(docs, next) {
  //console.log(docs);
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

//Aggregation Middleware
internSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretIntern: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Intern = mongoose.model('Intern', internSchema);

module.exports = Intern;
