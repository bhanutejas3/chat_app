const { json } = require("express");
const avatarModel = require("../model/avatarModel");
const bcrypt = require("bcrypt");

module.exports.avatar = async (req, res, next) => {
  try {
    const { avatarID } = req.body;
    if (!avatarID) {
      return res.json({
        message: "avatarID is missing",
        status: false,
      });
    }

    console.log(avatarID);
    const avatarIdUser = await avatarModel
      .findOne({ avatarNumber: avatarID })
      .then((data) => {
        if (data === null) {
          return false;
        } else {
          return true;
        }
      });

    console.log(avatarIdUser);
    if (avatarIdUser) {
      return res.json({ message: "avatar found", status: true, avatarIdUser });
    } else {
      const apiString = process.env.AVATAR_API_MULTI + avatarID;
      try {
        const image = await fetch(apiString);
        const buffer =
          "data:image/svg+xml;base64," +
          btoa(decodeURIComponent(encodeURIComponent(image)));
        const hashedBuffer = await bcrypt.hash(buffer, 9);
        const avatarUser = await avatarModel.create({
          avatarNumber: avatarID,
          avatar: hashedBuffer,
        });
        return res.json({ message: "avatar found", status: true, avatarUser });
      } catch (error) {
        console.log(error);
        const totalCount = await avatarModel.count();
        const random = Math.floor(Math.random() * totalCount);
        const avatarIdUser = await avatarModel.findOne().skip(random);

        return res.json({
          message: "avatar found",
          status: true,
          avatarIdUser,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
