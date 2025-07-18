// models/Log.js
import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  action: { type: String, required: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logSchema);

export default Log;