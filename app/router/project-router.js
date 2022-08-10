const { ProjectController } = require("../controllers/project-controller");
const {
  createProjectValidator,
  projectImageValidator,
} = require("../validation/project-validation");
const { checkLogin } = require("../middlewares/auto-login.js");
const { uploadFile } = require("../modules/express-file-upload");
const fileUpload = require("express-fileupload");

const router = require("express").Router();


//TODO                            OK
router.post(
  "/create",
  checkLogin,
  createProjectValidator(),
  ProjectController.createProject
);

//TODO--------------------------------------------------------------------------
router.post(
  "/upload-profile/:id",
  checkLogin,
  fileUpload(),
  uploadFile,
  ProjectController.uploadProjectProfile
);
//TODO--------------------------------------------------------------------------

//TODO                            OK
router.get("/all-projects" , ProjectController.getAllProjects)
//TODO                            OK
router.get("/user", checkLogin , ProjectController.getAllProjectByUser)
//TODO                            OK------------
router.get("/team", checkLogin , ProjectController.getAllProjectByTeam)
//TODO                            OK------------
router.patch("/update/:id" , checkLogin , ProjectController.updateProject)
//TODO                            OK------------
router.delete("/delete/:id" , checkLogin , ProjectController.deleteProject)
//TODO                            OK------------
router.get("/:id", checkLogin , ProjectController.getProjectById)

module.exports = {
  projectRouter: router,
};
