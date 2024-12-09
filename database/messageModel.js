const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  sender_type: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const messageModel = mongoose.model('Message', messageSchema);
module.exports = messageModel;

