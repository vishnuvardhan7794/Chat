const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  message: { type: Object, default: null },
  timestamp: { type: String, default: new Date() },
  userId: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  roomId: { type: String, default: null },
});
module.exports = mongoose.model("chat", chatSchema);
