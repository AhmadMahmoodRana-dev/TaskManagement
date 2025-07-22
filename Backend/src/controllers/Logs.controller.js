import Log from "../schema/Logs.schema.js";

const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email") // populate only selected fields like name and email
      .populate("task", "title")      // optional: if you want task title
      .populate("project", "name");   // optional: if you want project name

    res.status(200).json(logs);
  } catch (error) {
    console.error("Get All Logs Error:", error);
    res.status(500).json({ message: "Server error while fetching logs" });
  }
};

export default getAllLogs;
