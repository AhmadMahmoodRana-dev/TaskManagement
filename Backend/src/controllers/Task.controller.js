import Task from "../schema/Task.schema.js";
import Project from "../schema/Project.schema.js";
import Log from "../schema/Logs.schema.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, status, priority, dueDate, estimatedHours } = req.body;
    const createdBy = req.user.userId;

    // Optional: Ensure project exists
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ error: "Project not found" });
    }

    const task = await Task.create({
      title,
      description,
      project,
      createdBy,
      assignedTo,
      status,
      priority,
      dueDate,
      estimatedHours
    });

    await Log.create({
      action: "Task Created",
      user: createdBy,
      task: task._id,
      project: project,
      description: `${title} was created by user ${createdBy}`
    });


    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get task by task ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("project", "name");

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get tasks by project ID
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .sort({ dueDate: 1 })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get tasks assigned to the current user
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.userId })
      .sort({ dueDate: 1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const updatedBy = req.user.userId;
    const oldTask = await Task.findById(req.params.taskId);

    if (!oldTask) return res.status(404).json({ error: "Task not found" });

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    // Add a log entry
    await Log.create({
      action: "Task Updated",
      user: updatedBy,
      task: updatedTask._id,
      project: updatedTask.project,
      description: `Task "${updatedTask.title}" was updated by user ${updatedBy}`
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete task
export const deleteTask = async (req, res) => {
  try {
    const deletedBy = req.user.userId;
    const task = await Task.findByIdAndDelete(req.params.taskId);

    if (!task) return res.status(404).json({ error: "Task not found" });

    // Log deletion
    await Log.create({
      action: "Task Deleted",
      user: deletedBy,
      task: task._id,
      project: task.project,
      description: `Task "${task.title}" was deleted by user ${deletedBy}`
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};