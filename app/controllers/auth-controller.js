const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user-model");
const { hashSting, tokenGenerator } = require("../modules/functions");

class AuthController {
  async register(req, res, next) {
    const { username, password, confirm_password, email, phone_number } =
      req.body;
    const result = validationResult(req);
    if (result.errors.length > 0) {
      res.status(401).json({
        status: 401,
        data: null,
        errors: result,
      });
    } else {
      const existUser = await UserModel.findOne({
        $or: [{ username }, { phone_number }, { email }],
      });
      if (!existUser) {
        const user = await UserModel.create({
          username,
          email,
          phone_number,
          password: hashSting(password),
        });
        res.status(200).json(user);
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          data: null,
          message: "username or email or phone number already exist",
        });
      }
    }
  }

  async login(req, res) {
    const result = validationResult(req);
    if (result.errors.length > 0) {
      res.status(401).json({
        status: 401,
        data: null,
        errors: result,
      });
    } else {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) {
        res.status(400).json({
          status: 400,
          data: null,
          message: "user not found",
        });
      } else {
        const compareResult = bcrypt.compareSync(password, user.password);
        if (!compareResult) {
          res.status(400).json({
            status: 400,
            data: null,
            message: "user not found",
          });
        } else {
          const token = tokenGenerator({ username });
          user.token = token;
          user.save();
          res.status(200).json({
            status: 200,
            success: true,
            message: "login successful",
            token,
          });
        }
      }
    }
  }

  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
