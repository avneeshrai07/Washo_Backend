const express = require("express");
const router = express.Router();
const { messageModel } = require("../database/messageModel"); 

router.post("/messages", async (req, res) => {
  try {
    const io = req.app.get("socketio"); // Get Socket.IO instance
    const { uid, sender, name, message } = req.body;

    if (!uid || !sender || !name || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    
    const newMessage = new messageModel({
      roomId,
      sender,
      name,
      message,
      timestamp: new Date(),
    });

    // Save the new message to the database
    await newMessage.save();

    // Emit the message to the room (uid) using Socket.IO
    io.to(uid).emit("receive_message", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
