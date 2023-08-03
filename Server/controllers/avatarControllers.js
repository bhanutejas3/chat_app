const avatarModel = require("../model/avatarModel");
const axios = require("axios");
const User = require("../model/userModel");
const { createSecretToken } = require("../util/SecretToken");

module.exports.avatar = async (req, res, next) => {
  try {
    const { avatarID } = req.body;
    if (!avatarID) {
      return res.json({
        message: "avatarID is missing",
        status: false,
      });
    }

    const avatarIdUser = await avatarModel
      .findOne({ avatarNumber: avatarID })
      .then((data) => {
        if (data === null) {
          return false;
        } else {
          return true;
        }
      });

    if (avatarIdUser) {
      const avatarUser = await avatarModel.findOne({ avatarNumber: avatarID });
      let user = avatarUser.toObject();
      user = user["avatar"];
      return res.json({ message: "avatar found", status: true, user });
    } else {
      const apiString = process.env.AVATAR_API_MULTI + avatarID;
      try {
        const image = await axios(apiString);
        const avatarUser = await avatarModel.create({
          avatarNumber: avatarID,
          avatar: image.data,
        });
        let user = avatarUser.toObject();
        user = user["avatar"];
        return res.json({
          message: "avatar found",
          status: true,
          user,
        });
      } catch (error) {
        console.log("Server count exceed " + error);
        const totalCount = await avatarModel.count();
        const random = Math.floor(Math.random() * totalCount);
        const avatarUser = await avatarModel.findOne().skip(random);
        let user = avatarUser.toObject();
        user = user["avatar"];
        return res.json({
          message: "avatar found",
          status: true,
          user,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports.avatarUpdate = async (req, res, next) => {
  try {
    const { id, avatar } = req.body;
    if (!id || !avatar) {
      return res.json({
        message: "id and avatar are missing",
        status: false,
      });
    }
    const dataUser = await User.findOne({ _id: id });

    if (!dataUser) {
      return res.json({
        message: "User is not Created",
        status: false,
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      dataUser._id,
      {
        isAvatarImageSet: true,
        avatarImage: avatar,
      },
      { new: true }
    );

    const user = updateUser.toObject();
    delete user["password"];

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.json({
      message: "User avatar update success",
      status: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAvatar = async (req, res, next) => {
  try {
    const username = req.params.id;
    if (!username) {
      return res.json({
        message: "username is missing",
        status: false,
      });
    }
    const dataUser = await User.findOne({ username });

    if (!dataUser) {
      return res.json({
        message: "User is not Created",
        status: false,
      });
    }

    const user = dataUser.toObject();
    delete user["password"];

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.json({
      message: "User avatar update success",
      status: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
