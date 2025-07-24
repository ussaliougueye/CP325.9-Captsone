// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "", // URL to profile picture
    },
    
    isOnline: {
      type: Boolean,
      default: false,
    },
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
