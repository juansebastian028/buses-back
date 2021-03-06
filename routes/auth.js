const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const { login, googleSignin } = require("../controllers/auth");

const router = Router();

router.post(
	"/login",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "La contraseña es obligatoria").not().isEmpty(),
		validateFields,
	],
	login
);

router.post(
	"/google",
	[
		check("tokenId", "El tokenId es necesario").not().isEmpty(),
		validateFields,
	],
	googleSignin
);

module.exports = router;