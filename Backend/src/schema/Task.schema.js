import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project ID is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator ID is required"],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: [
        "todo",
        "inProgress",
        "review",
        "completed",
        "archived",
        "pending",
      ],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value > Date.now();
        },
        message: "Due date must be in the future",
      },
    },
    completedAt: Date,
    estimatedHours: {
      type: Number,
      min: [0, "Estimated hours cannot be negative"],
    },
    actualHours: {
      type: Number,
      min: [0, "Actual hours cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

taskSchema.index({ project: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });

taskSchema.virtual("formattedDueDate").get(function () {
  return this.dueDate?.toISOString().split("T")[0];
});

taskSchema.virtual("isOverdue").get(function () {
  return (
    this.dueDate && this.status !== "completed" && this.dueDate < new Date()
  );
});

taskSchema.virtual("subtasks", {
  ref: "Subtask",
  localField: "_id",
  foreignField: "task",
});

const Task = mongoose.model("Task", taskSchema);

export default Task;