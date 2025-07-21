// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    //   required: true,
      unique: true,
      trim: true,
    },
    firsename: {
      type: String,
    
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    //   required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    //   required: true,
    },
    profilePicture: {
      type: String,
      default: "", // URL to profile picture
    },
    bio: {
      type: String,
      default: "",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    // List of chat IDs or user references for conversations
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    // List of blog posts created by this user
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);



const Userr = mongoose.model("User", userSchema);

module.exports = Userr;