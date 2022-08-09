const router = require("express").Router();
const { authRouter } = require("./auth-router");
const { projectRouter } = require("./project-router");
const { teamRouter } = require("./team-router");
const { userRouter } = require("./user-router");


//TODO                            OK
router.use("/auth", authRouter);

//TODO                            OK
router.use("/users", userRouter);

//TODO                            OK------------
router.use("/project", projectRouter);

//TODO                            OK------------
router.use("/team", teamRouter);

module.exports = {
  allRoutes: router,
};
