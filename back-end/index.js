const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.js");
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
    const newMessage = new User(req.body);
    await newMessage.save();
    res.status(201).json({ message: "Message saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
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

// Start server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
