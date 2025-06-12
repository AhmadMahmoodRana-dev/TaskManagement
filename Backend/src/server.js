import express from "express";
import ConnectDb from "./config/ConnectDb.js";
import MainRoute from "./routes/MainRoute.js";
import "dotenv/config.js"
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

MainRoute(app);

ConnectDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
});
