const { UserModel } = require("../models/user-model");
const { tokenValidator } = require("../modules/functions");

const checkLogin = async (req, res, next) => {
  try {
    const authorization = req?.headers?.authentication;
    if (!authorization) {
      throw { status: 401, message: "please login into your account" };
    } else {
      let token = authorization.split(" ")?.[1];
      if (!token) {
        throw { status: 401, message: "please login into your account" };
      } else {
        const result = tokenValidator(token);
        const user = await UserModel.findOne({ username: result.username });
        if(!user) throw {status : 400 , message : "user not found"}
        req.user = user;
      } 
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkLogin,
};
