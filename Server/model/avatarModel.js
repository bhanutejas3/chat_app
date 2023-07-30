const mongoose = require("mongoose");

const avatarModel = new mongoose.Schema({
  avatar: {
    type: String,
    required: true,
    unique: true,
  },
  avatarNumber: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("avatar", avatarModel);
