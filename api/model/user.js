const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [4, "Minimum password length is 4 characters"],
    select: false,
  },
  phoneNumber: {
    type: Number,
  },
  addresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      addressType: {
        type: String,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPassword: Date,
});

// HASHING PASSWORD 
userSchema.pre('save',  function(next){
    if(!this.password){
        next()
    }
    this.password =  bcrypt.hash(this.password, 10)
    next()
})

// CREATING A JWT TOKEN 
userSchema.methods.getJWT_TOKEN = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_EXPIRY
    })
}

// COMPARING PASSWORD 
userSchema.methods.comparePassword = async function (passwordEntered) {
    return await bcrypt.compare(passwordEntered, this.password)
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
