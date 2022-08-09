const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

function hashSting(str) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY);
  return token;
}

function tokenValidator(token) {
  const result = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  if (!result?.username) {
    throw { status: 401, message: "please login into your account" };
  } else {
    return result;
  }
}

function createPahtDirectory() {
  let d = new Date();
  const year = "" + d.getFullYear();
  const month = "" + d.getMonth();
  const day = "" + d.getDay();
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "upload",
    year,
    month,
    day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "upload", year, month, day);
}


module.exports = {
  hashSting,
  tokenGenerator,
  tokenValidator,
  createPahtDirectory,
};
