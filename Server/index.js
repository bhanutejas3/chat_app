const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const authRoutes = require("./routes/appRoute");
const messagesRoutes = require("./routes/messagesRoute");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

portNumber = process.env.PORT;
mongoUrl = process.env.MONGO_URL;

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/auth", messagesRoutes);

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection is Good");
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(portNumber, () => {
  console.log(portNumber + " Started");
});

const io = socket(server, {
  cors: {
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: "http://localhost:5173",
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("Client connected");

  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
