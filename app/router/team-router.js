const { TeamController } = require("../controllers/team-controller");
const { checkLogin } = require("../middlewares/auto-login");

const router = require("express").Router();

router.post("/create" , checkLogin , TeamController.createTeam)


module.exports = {
    teamRouter : router
}
