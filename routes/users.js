const { Router } = require("express");
const { check } = require("express-validator");

const {
	validateFields,
	validateJWT,
	isAdminRole,
	hasRole,
} = require("../middlewares");

const {
	isRoleValid,
	emailExist,
	existUserById,
} = require("../helpers/db-validators");

const {
	usersGet,
	usersPut,
	usersPost,
	usersDelete,
	usersPatch,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.put(
	"/:id",
	[
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existUserById),
		check("rol").custom(isRoleValid),
		validateFields,
	],
	usersPut
);

router.post(
	"/",
	[
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("password", "El password debe de ser más de 6 letras").isLength({
			min: 6,
		}),
		check("email", "El email no es válido").isEmail(),
		check("email").custom(emailExist),
		// check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
		check("rol").custom(isRoleValid),
		validateFields,
	],
	usersPost
);

router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		hasRole("ADMIN_ROLE"),
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existUserById),
		validateFields,
	],
	usersDelete
);

router.patch("/", usersPatch);

module.exports = router;