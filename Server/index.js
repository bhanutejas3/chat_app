const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const authRoutes = require("./routes/appRoute");
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

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection is Good");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(portNumber, () => {
  console.log(portNumber + " Started");
});
