const { body } = require("express-validator");

function registerValidator() {
  return [
    body("username")
      .notEmpty()
      .isLength({ min: 4, max: 18 })
      .isString()
      .withMessage("username is not valid"),
    body("email").notEmpty().isEmail().withMessage("email is not valid"),
    body("phone_number")
      .notEmpty()
      .isMobilePhone("fa-IR")
      .withMessage("phone number is not valid"),
    body("password")
      .notEmpty()
      .isLength({ min: 6, max: 16 })
      .withMessage("pasword must min 6 characters and max 16 character")
      .custom((value, ctx) => {
        if (!value) throw "username can not be empty";
        if (value != ctx?.req?.body?.confirm_password)
          throw "password is not a same with confirm password";
        return true;
      }),
  ];
}

function loginValidator() {
  return [
    body("username").notEmpty().isString().withMessage("username is not valid"),
    body("password").notEmpty().isString().withMessage("password is not valid"),
  ];
}

module.exports = {
  registerValidator,
  loginValidator,
};
