const { validationResult } = require("express-validator");
const { UserModel } = require("../models/user-model");
const { tokenGenerator } = require("../modules/functions");

class UserController {
  async createUser(req, res, next) {
    try {
      const {
        first_name,
        last_name,
        username,
        email,
        phone_number,
        skills,
        role,
        password,
      } = req.body;
      const result = validationResult(req);
      if (result.errors.length > 0) {
        res.status(400).json({
          status: 400,
          suucess: false,
          errors: result,
        });
      } else {
        const existUser = await UserModel.findOne({
          $or: [{ username }, { phone_number }, { email }],
        });
        if (!existUser) {
          const createdUser = await UserModel.create({
            first_name,
            last_name,
            username,
            email,
            phone_number,
            skills,
            role,
            password,
          });

          res.status(200).json({
            status: 200,
            success: true,
            message: "user created",
            createdUser,
          });
        } else {
          res.status(400).json({
            status: 400,
            success: false,
            data: null,
            message: "username or email or phone number already exist",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.find({}, { password: 0, __v: 0 });
      res.status(200).json({
        status: 200,
        success: true,
        message: "all users",
        users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const userID = req.params.id;

      const user = await UserModel.findById(userID, { __v: 0, password: 0 });
      if (!user) {
        res.status(400).json({
          status: 400,
          success: false,
          data: null,
          message: "user not found",
        });
      } else {
        res.status(200).json({
          status: 200,
          success: true,
          message: "user with ID",
          user,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        success: false,
        data: null,
        message: "user not found",
      });
    }
  }

  async getUserProfile(req, res, next) {
    try { 
      const user = req.user;
      user.profile_image = `${req.protocol}://${req.get("host")}/${
        (user.profile_image).replace(/\/\// , "/")
      }`;
      res.status(200).json({
        status: 200,
        success: true,
        message: "user profile",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = req.user;
      const { first_name, last_name, username, phone_number, email, skills } =
        req.body;
      if (
        first_name ||
        last_name ||
        username ||
        phone_number ||
        email ||
        skills
      ) {
        if (username) {
          const token = tokenGenerator({ username });
          user.token = token;
          user.save();
          const update = await UserModel.findByIdAndUpdate(user._id, {
            first_name,
            last_name,
            username,
            phone_number,
            email,
            skills,
            token,
          });
          const updatedUser = await UserModel.findById(user._id);
          res.status(200).json({
            status: 200,
            success: true,
            message: "user updated",
            updatedUser,
          });
        } else {
          const update = await UserModel.findByIdAndUpdate(user._id, {
            first_name,
            last_name,
            phone_number,
            email,
            skills,
          });
          const updatedUser = await UserModel.findById(user._id);
          res.status(200).json({
            status: 200,
            success: true,
            message: "user updated",
            updatedUser,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          data: null,
          message: "please update at least one field",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userID = req.params.id;

      const deletedUser = await UserModel.findByIdAndDelete(userID);
      if (!deletedUser) {
        res.status(400).json({
          status: 400,
          success: false,
          data: null,
          message: "user not found",
        });
      } else {
        res.status(200).json({
          status: 200,
          success: true,
          message: "user deleted",
          deletedUser,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async userDeleteAccount(req, res, next) {
    try {
      const user = req.user;
      const deletedAccount = await UserModel.findByIdAndDelete(user._id);
      if (!deletedAccount) {
        res.status(400).json({
          status: 400,
          success: false,
          data: null,
          message: "please login into your account",
        });
      } else {
        res.status(200).json({
          status: 200,
          success: true,
          message: "your account deleted",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async uploadProfileImage(req, res, next) {
    try {
      const userID = req.user._id;
      const resultValidate = validationResult(req);
      if (resultValidate.errors.length > 0) {
        res.status(401).json({
          status: 401,
          data: null,
          errors: resultValidate,
        });
      } else {
        const filePath = req.file.path.substring(7);
        const result = await UserModel.updateOne(
          { _id: userID },
          { $set: { profile_image: filePath } }
        );
        if ((result.modifiedCount = 0))
          throw { status: 400, message: "cannot update profile" };
        return res.status(200).json({
          status: 200,
          success: true,
          message: "profile updated",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async acceptTeamInvite(req, res, next) {}

  async rejectTeamInvite(req, res, next) {}
}

module.exports = {
  UserController: new UserController(),
};

