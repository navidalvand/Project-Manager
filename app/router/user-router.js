const { UserController } = require("../controllers/user-controller");
const { checkLogin } = require("../middlewares/auto-login");
const { upload_multer } = require("../modules/multer");
const {
  userValidation,
  imageValidator,
} = require("../validation/user-validation");
const router = require("express").Router();

//TODO                            OK
router.get("/", UserController.getAllUsers);
//TODO                            OK
router.get("/profile", checkLogin, UserController.getUserProfile);
//TODO                            OK
router.delete("/delete", checkLogin, UserController.userDeleteAccount);
//TODO                            OK
router.patch("/update", checkLogin, UserController.updateUser);
//TODO                            OK
router.post("/create", userValidation(), UserController.createUser);
//TODO                            OK------------
router.post(
  "/profile-image",
  checkLogin,
  upload_multer.single("image"),
  imageValidator(),
  UserController.uploadProfileImage
);
//TODO                            OK
router.get("/:id", UserController.getUser);
//TODO                            OK------------
router.delete("/:id", UserController.deleteUser);

module.exports = {
  userRouter: router,
};
