import express from "express";
import ConnectDb from "./config/ConnectDb.js";
import MainRoute from "./routes/MainRoute.js";
import "dotenv/config.js"
import cors from "cors"
import http from "http";
import { Server } from 'socket.io';



const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors())

MainRoute(app);

io.on('connection', (socket) => {
  console.log('a user connected');
});

ConnectDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
});
