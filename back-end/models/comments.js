const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
  },
  likes: {
    type: [String], // this is the number of likes the post get
    default: [],
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
