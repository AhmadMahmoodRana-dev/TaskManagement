import mongoose from "mongoose";
import 'dotenv/config.js'

const ConnectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagercluster.efj2l4w.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagerCluster`
    );
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default ConnectDb;