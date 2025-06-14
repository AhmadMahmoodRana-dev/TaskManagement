import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
    trim: true,
    maxlength: [100, "Project name cannot exceed 100 characters"]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator ID is required"]
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Member user ID is required"]
      },
      role: {
        type: String,
        enum: ["owner", "manager", "developer", "viewer"],
        default: "developer"
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  deadline: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value > Date.now();
      },
      message: "Deadline must be in the future"
    }
  },
  progress: {
    type: Number,
    min: [0, "Progress cannot be negative"],
    max: [100, "Progress cannot exceed 100%"],
    default: 0
  },
  status: {
    type: String,
    enum: ["active", "completed", "archived"],
    default: "active"
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for faster queries
projectSchema.index({ name: "text" });
projectSchema.index({ "members.user": 1 });
projectSchema.index({ createdBy: 1 });

// Virtual for formatted deadline
projectSchema.virtual("formattedDeadline").get(function() {
  return this.deadline?.toISOString().split('T')[0];
});

const Project = mongoose.model("Project", projectSchema);

export default Project;