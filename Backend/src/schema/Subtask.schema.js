import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Subtask title is required"],
    trim: true,
    maxlength: [200, "Subtask title cannot exceed 200 characters"]
  },
  description: {
    type: String,
    required: [true, "Subtask description is required"],
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["todo", "inProgress", "review", "completed"],
    default: "todo"
  },
  priority:{
    type:String,
    enum:["low","medium","high"],
    default:"low"
  },
  estimatedHours:{
    type:Number,
    default:0
  },
  dueDate: Date,
  completedAt: Date
}, {
  timestamps: true
});

const Subtask = mongoose.model("Subtask", subtaskSchema);
export default Subtask;
