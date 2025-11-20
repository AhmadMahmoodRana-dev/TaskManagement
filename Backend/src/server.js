import express from "express";
import http from "http";
import { Server } from "socket.io";
import ConnectDb from "./config/ConnectDb.js";
import MainRoute from "./routes/MainRoute.js";
import "dotenv/config.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Export `io` globally
app.set("io", io);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
MainRoute(app);

// Handle socket connection
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("joinProjectRoom", (projectId) => {
    socket.join(projectId);
    console.log(`User ${socket.id} joined room ${projectId}`);
  });

  socket.on("leaveProjectRoom", (projectId) => {
    socket.leave(projectId);
    console.log(`User ${socket.id} left room ${projectId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

app.get("/",(req,res) =>{
  res.send('TASK MANAGEMENT BACKEND ADDED SUCCESSFULLY !')
})


// Connect to DB and start server
const PORT = process.env.PORT || 3000;
ConnectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});
