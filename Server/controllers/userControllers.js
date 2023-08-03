const { json } = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../util/SecretToken");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.json({
        message: "username, email and password are missing",
        status: false,
      });
    }
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return res.json({
        message: "username already exists",
        status: false,
      });
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.json({
        message: "email already exists",
        status: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 9);

    const dataUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    let user = dataUser.toObject();
    delete user["password"];

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    return res.json({ message: "User added", status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        message: "username and password are missing",
        status: false,
      });
    }
    const dataUser = await User.findOne({ username }).select("+password");

    if (!dataUser) {
      return res.json({
        message: "Incorrect username or password",
        status: false,
      });
    }
    const passwordCheck = await bcrypt.compare(password, dataUser.password);

    if (!passwordCheck) {
      return res.json({
        message: "Incorrect username or password",
        status: false,
      });
    }

    let user = dataUser.toObject();
    delete user["password"];

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.json({ message: "User Login success", status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        message: "username and password are missing",
        status: false,
      });
    }
    const dataUser = await User.findOne({ username }).select("+password");

    if (!dataUser) {
      return res.json({
        message: "Incorrect username or password",
        status: false,
      });
    }
    const passwordCheck = await bcrypt.compare(password, dataUser.password);

    if (!passwordCheck) {
      return res.json({
        message: "Incorrect username or password",
        status: false,
      });
    }

    let user = dataUser.toObject();
    delete user["password"];

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.json({ message: "User Login success", status: true, user });
  } catch (error) {
    next(error);
  }
};
