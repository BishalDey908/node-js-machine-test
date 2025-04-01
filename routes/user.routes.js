const { userCreateController } = require("../controller/user.controller");

const Router = require("express");
const router = Router();

router.post("/userCreation", userCreateController);

module.exports = router;
