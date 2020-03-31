const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema(
  {
    college: [
      {
        college_name: {
          type: String,
          required: [true, 'Please enter college name'],
          maxlength: [
            50,
            'A college name must have less or equal to 50 characters'
          ],
          minlength: [5, 'A college name must be more than 5 characters']
        },
        phone_number: {
          type: Number,
          maxlength: [10, 'A Enter a valid Phone Number']
        },
        website: {
          type: String,
          validate: [validator.isURL, 'Please enter a valid website!']
        },
        email: {
          type: String,
          validate: [validator.isEmail, 'Please enter a valid Email']
        }
      }
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    // internship: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Internship'
    //   }
    // ],
    skills: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SkillTypeMaster'
      }
    ],
    academic_details: {
      school_name: {
        type: String,
        required: [true, 'Please Enter School Name'],
        maxlength: [
          50,
          'A School Name must have less or equal to 50 characters'
        ],
        minlength: [5, 'A School name must be more than 5 characters']
      },
      college_name: {
        type: String,
        required: [true, 'Please enter your Graduation College name'],
        maxlength: [
          50,
          'A College name must have less or equal to 50 characters'
        ],
        minlength: [5, 'A college name must be more than 5 characters']
      },
      pu_college_name: {
        type: String,
        required: [true, 'Please enter your PU College name'],
        maxlength: [
          50,
          'A College name must have less or equal to 50 characters'
        ],
        minlength: [5, 'A college name must be more than 5 characters']
      },
      usn: {
        type: String,
        required: [true, 'Please enter USN'],
        maxlength: [10, 'Please enter valid USN'],
        minlength: [10, 'Please enter valid USN']
      },
      university_name: {
        type: String,
        required: [true, 'Please enter University Name'],
        maxlength: [
          50,
          'An University name must have less or equal to 50 characters'
        ],
        minlength: [5, 'An university name must be more than 5 characters']
      },
      project1_undertaken: {
        type: String,
        maxlength: [
          30,
          'Project title 1 must have less or equal to 30 characters'
        ],
        minlength: [5, 'A project title must be more than 5 characters']
      },
      project2_undertaken: {
        type: String,
        maxlength: [
          30,
          'Project title 2 must have less or equal to 30 characters'
        ],
        minlength: [5, 'A project title must be more than 5 characters']
      },
      grade_10_per: {
        type: Number,
        max: [100, 'Please enter valid Percentage'],
        min: [0, 'Please enter valid Percentage']
      },
      grade_12_per: {
        type: Number,
        max: [100, 'Please enter valid Percentage'],
        min: [0, 'Please enter valid Percentage']
      },
      degree_cgpa: {
        type: Number,
        max: [10, 'Please enter valid CGPA'],
        min: [1, 'Please enter valid CGPA']
      }
    },
    personal_details: {
      gender: {
        type: String,
        enum: {
          values: ['Male', 'Female'],
          message: 'Choose either of the gender'
        }
      },
      hobbies: String,
      father_name: {
        type: String,
        required: [true, 'Please provide your Father Name'],
        maxlength: [50, 'Father name must have less or equal to 50 characters'],
        minlength: [5, 'Father name must more than 5 characters']
      },
      mother_name: {
        type: String,
        required: [true, 'Please provide your Mother Name'],
        maxlength: [50, 'Mother name must have less or equal to 50 characters'],
        minlength: [5, 'Mother name must more than 5 characters']
      },
      dob: Date
    },
    resume: String,
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

//Virtual Populate
studentSchema.virtual('address', {
  ref: 'Address',
  foreignField: 'user',
  localField: 'user'
});

studentSchema.pre(/^find/, function(next) {
  //this points to current query
  this.populate({
    path: 'user skills internship',
    select: '-__v -requiredSkills'
  })
    .populate({
      path: 'skills ',
      select: '-__v -slug ',
      options: {
        sort: 'skill_name'
      }
    })
    .populate({
      path: 'user',
      select: '-id -_id -__v -roleType -slug '
    });
  next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
