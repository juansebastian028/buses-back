const { Router } = require("express");

const {
	rolesGet
} = require("../controllers/role");

const router = Router();

router.get("/", rolesGet);

module.exports = router;