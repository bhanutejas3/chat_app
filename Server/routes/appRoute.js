const { register, login } = require("../controllers/userControllers");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { avatar } = require("../controllers/avatarControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/", userVerification);
router.post("/avatarId", avatar);
module.exports = router;
