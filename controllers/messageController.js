// messageController.js

const express = require("express");
const router = express.Router();
const Message = require("./models/Message");

// Fetch messages by UID
router.get("/messages/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const messages = await Message.find({ uid }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Save a new message
router.post("/messages", async (req, res) => {
  try {
    const { uid, sender, message } = req.body;
    const newMessage = new Message({ uid, sender, message });
    await newMessage.save();
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

module.exports = router;
