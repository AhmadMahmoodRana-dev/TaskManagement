import Log from "../schema/Logs.schema.js";

// Get all logs
const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error("Get All Logs Error:", error);
    res.status(500).json({ message: "Server error while fetching logs" });
  }
};

export default getAllLogs;
