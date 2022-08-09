const { body } = require("express-validator");
const path = require('path');

function createProjectValidator() {
  return [
    body("title")
      .notEmpty()
      .isString()
      .isLength({min : 3 , max : 80})
      .withMessage("project's title is not valid"),
    body("description")
      .isString()
      .isLength({max : 500})
      .withMessage("project's description is not valid"),
  ];
}

function projectImageValidator() {
  return [
    body("image").custom((image, { req }) => {
      if (Object.keys(req.files.image).length == 0)
      throw { status: 400, message: "please select a image" };
      console.log(req.files.image);
        const ext = path.extname(req.files.image.name)
        console.log(ext);
        const exts = [".jpg" , ".png" , ".jpeg" , ".gif" , ".jfif"]
        if(!exts.includes(ext)) throw {status : 400 , message : "file format is not valid"}
        const maxSize = 10 * 1024 * 1024 
        if(req.file.image.size > maxSize) throw {status : 400 , message : "file size is over than 10MB"}
        return true
    }),
  ];
}

module.exports = {
  createProjectValidator,
  projectImageValidator
};

