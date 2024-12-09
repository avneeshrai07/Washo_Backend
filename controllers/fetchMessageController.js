const express = require("express");
const router = express.Router();
const { messageModel } = require('../database/mongodb');

// Retrieve messages by User ID (uid), sorted by timestamp in ascending order
router.get("/:roomId", async (req, res) => {
    try {
    const roomId = req.params.roomId;
      // Retrieve the roomId from params
    const fetchedMessages = await messageModel.find({ roomId }).sort({ timestamp: -1 });
    console.log('fetched messages from database', fetchedMessages)
    res.status(200).json(fetchedMessages);
    // res.status(200).json(messages);
    } catch (error) {
      console.error("Error retrieving messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = router;