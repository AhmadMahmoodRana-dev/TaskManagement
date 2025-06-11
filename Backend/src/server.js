import express from "express";
import ConnectDb from "./config/ConnectDb.js";


const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

ConnectDb().then(() => {
  app.listen(3000, () => {
    console.log("✅ Server is running on port 3000");
  });
});
