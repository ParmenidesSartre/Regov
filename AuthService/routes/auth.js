const router = require("express").Router();
const authController = require("../controllers/authController");
const { register, login } = require("../validation/validation");
const validate = require("../middlewares/validate");

router.route("/register").post(validate(register), authController.register);
router.route("/login").post(validate(login), authController.login);

module.exports = router;
