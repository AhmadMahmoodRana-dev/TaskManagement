import Subtask from "../schema/Subtask.schema.js";

const addSubTask = async (req, res) => {
  try {
    let subtasks;
    if (Array.isArray(req.body)) {
      subtasks = await Subtask.insertMany(req.body, { runValidators: true });
    } else {
      subtasks = await Subtask.create(req.body);
    }

    res.status(201).json(subtasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default addSubTask;
