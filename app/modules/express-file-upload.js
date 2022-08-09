const path = require("path");
const { createPahtDirectory } = require("./functions");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length == 0)
      throw { status: 400, message: "project picture profile not found" };
    let image = req.files.image;
    let uploadPath = path.join(
      __dirname,
      "..",
      "..",
      createPahtDirectory(),
      image.name
    );
    image.mv(uploadPath, (err) => {
      if (err) throw {status : 400 , message : "oh fuck"}
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
};
