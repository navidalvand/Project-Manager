const { body } = require("express-validator");
const path = require("path");

function userValidation() {
  return [
    body("username")
      .isString()
      .isLength({ min: 5, max: 18 })
      .withMessage("username is not valid"),
    body("phone_number")
      .isString()
      .isLength({ min: 11, max: 11 })
      .withMessage("phone number is not valid"),
    body("email")
      .isString()
      .isLength({ min: 6, max: 34 })
      .withMessage("email is not valid"),
    body("password")
      .notEmpty()
      .withMessage("password is empty")
      .isString()
      .withMessage("password is not valid"),
    body("tags")
      .isArray()
      .isLength({ min: 0, max: 10 })
      .withMessage("tags is not valid"),
  ];
}

function imageValidator() {
  return [
    body("image").custom((image, { req }) => {
      if (Object.keys(req.file).length == 0)
        throw { status: 400, message: "please select a image" };
      const ext = path.extname(req.file.originalname);
      const exts = [".jpg", ".png", ".jpeg", ".gif", ".jfif"];
      if (!exts.includes(ext))
        throw { status: 400, message: "file format is not valid" };
      const maxSize = 10 * 1024 * 1024;
      if (req.file.size > maxSize)
        throw { status: 400, message: "file size is over than 10MB" };
      return true;
    }),
  ];
}

module.exports = {
  userValidation,
  imageValidator,
};
