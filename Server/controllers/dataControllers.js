const { json } = require("express");
const User = require("../model/userModel");
const { createSecretToken } = require("../util/SecretToken");

module.exports.getUsers = async (req, res, next) => {
  try {
    const username = req.params.id;
    if (!username) {
      return res.json({
        message: "username is missing",
        status: false,
      });
    }
    const dataUser = await User.find({ username: { $ne: username } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    return res.json({
      message: "User data sent",
      status: true,
      dataUser,
    });
  } catch (error) {
    next(error);
  }
};
