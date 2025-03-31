const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 2,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 2,
    trim: true,
  },
  email: {
    type: String,
    index: true,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    lowercase: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.length === 10,
      message: "Phone number must be exactly 10 digits.",
    },
    trim: true,
  },
  address: {
    type: [
      {
        street: {
          type: String,
          required: true,
          trim: true,
        },
        city: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        zipCode: {
          type: String,
          required: true,
          validate: {
            validator: (v) => /^\d{5}$/.test(v), // Exactly 5 digits
            message: (props) =>
              `${props.value} is not a valid zip code! Must be 5 digits.`,
          },
          trim: true,
        },
      },
    ],
  },

  dateOfBirth: {
    type: Date,
    required:true,
    max: Date.now
  },
  isActive:{
    type:Boolean,
    default:true
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'moderator'],
    },
    default: 'user'  
  },
  profileImage:{
    type:String,
      validate: {
        validator: function(url) {
          // Check if it's a valid URL
          if (!validator.isURL(url)) return false;
          
          // Check for valid image extensions
          const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
          const extension = url.split('.').pop().toLowerCase();
          return allowedExtensions.includes('.' + extension);
        },
        message: props => `${props.value} is not a valid image URL! Must end with .jpg, .jpeg, .png, or .gif`
      }
  },
},{
    timestamps: true
});

userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
  });

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
