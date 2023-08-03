const messageModel = require("../model/messageModel");
const axios = require("axios");

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const userMessage = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (userMessage) {
      return res.json({ status: true, message: "Message sent" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const userMessage = await messageModel
      .find({
        users: { $all: [from, to] },
      })
      .sort({ updatedAt: 1 });

    const postedMessage = userMessage.map((msg) => {
      return {
        fromSender: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    return res.json(postedMessage);
  } catch (error) {
    next(error);
  }
};
