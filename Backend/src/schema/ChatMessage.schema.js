import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: [true, "Message cannot be empty"]
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

export default ChatMessage;
