const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const Comment = require("./models/comments.js");
const Feedback = require("./models/feedback.js");
const app = express();
const PORT = 3000;
const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.once("open", () => console.log("MongoDB connected"));

// API Route
app.post("/post", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log incoming data
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser); // Return the newly created user
  } catch (err) {
    console.error("Error saving user:", err); // Log error details
    res
      .status(500)
      .json({ error: "Failed to save user", details: err.message });
  }
});

app.get("/get", async (req, res) => {
  try {
    const messages = await User.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});
app.get("/get/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});
app.post("/comment", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to save comment" });
  }
});
app.get("/comment", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});
app.post("/feedback", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: "Feedback received" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save feedback" });
  }
});
app.get("/get/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});
app.put("/user/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const updateFields = { firstName, lastName, email };
    if (password) updateFields.password = password;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});
app.put("/comment/:id/like", async (req, res) => {
  try {
    const { email } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    const index = comment.likes.indexOf(email);
    if (index === -1) {
      comment.likes.push(email); // Like
    } else {
      comment.likes.splice(index, 1); // Unlike
    }
    await comment.save();
    res.json({ likes: comment.likes.length, liked: index === -1 });
  } catch (err) {
    res.status(500).json({ error: "Failed to update like" });
  }
});
// Start server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
