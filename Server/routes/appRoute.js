const { register, login } = require("../controllers/userControllers");
const { userVerification } = require("../MiddleWares/Middleware");
const { getUsers } = require("../controllers/dataControllers");
const {
  avatar,
  avatarUpdate,
  getAvatar,
} = require("../controllers/avatarControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/", userVerification);
router.post("/avatarId", avatar);
router.post("/avatarUpdate", avatarUpdate);
router.get("/getAvatar/:id", getAvatar);
router.get("/getAllUsers/:id", getUsers);
module.exports = router;
