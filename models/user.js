const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  avatar: {
    url: String,
    filename: String
  },
  otp: String,
  otpExpiry: Date
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
