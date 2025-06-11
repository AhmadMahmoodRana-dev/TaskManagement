import express from "express";
import ConnectDb from "./config/ConnectDb.js";
import MainRoute from "./routes/MainRoute.js";
import "dotenv/config.js"

const app = express();
app.use(express.json());

MainRoute(app);

ConnectDb().then(() => {
  app.listen(3000, () => {
    console.log("✅ Server is running on port 3000");
  });
});
