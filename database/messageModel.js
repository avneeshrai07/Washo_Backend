const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  uid: { type: String, required: true }, // User ID
  sender: { type: String, required: true }, // 'User' or 'Admin'
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
