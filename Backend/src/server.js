import express from "express";
import ConnectDb from "./config/ConnectDb.js";
import MainRoute from "./routes/MainRoute.js";
import "dotenv/config.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

MainRoute(app);

ConnectDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
});
