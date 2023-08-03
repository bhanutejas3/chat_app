const {
  sendMessage,

  getMessage,
} = require("../controllers/messagesCotrollers");

const router = require("express").Router();

router.post("/sendMessage", sendMessage);
router.post("/getMessage", getMessage);
module.exports = router;
