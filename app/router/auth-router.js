const { AuthController } = require("../controllers/auth-controller");
const {
  registerValidator,
  loginValidator,
} = require("../validation/auth-validation");
const router = require("express").Router();

//TODO                            OK
router.post("/register", registerValidator(), AuthController.register);


//TODO                            OK
router.post("/login", loginValidator(), AuthController.login);

module.exports = {
  authRouter: router,
};
