const path = require("path");
const { createPahtDirectory } = require("./functions");

const uploadFile = async (req, res, next) => {
  try {
    if (Object.keys(req.files).length == 0)
      throw { status: 400, message: "project picture profile not found" };
    let image = req.files.image;
    const image_path = path.join(
      createPahtDirectory(),
      Date.now() + path.extname(image.name)
    );
    req.body.image = image_path;
    let uploadPath = path.join(__dirname, "..", "..", image_path);
    image.mv(uploadPath, (err) => {
      if (err) throw { status: 400, message: "faild to upload picture" };
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
};
