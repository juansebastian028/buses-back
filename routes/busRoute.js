const { Router } = require("express");
const { check } = require("express-validator");

const {
	validateFields,
	validateJWT,
	hasRole,
} = require("../middlewares");

const {
	isRoleValid,
	existBusRouteById,
} = require("../helpers/db-validators");

const {
	busRouteGet,
	getBusRouteById,
	busRoutePost,
	busRoutePut,
	busRouteDelete,
	addComment,
} = require("../controllers/busRoute"); 

const router = Router();

router.get("/", busRouteGet);
router.get("/:id", getBusRouteById);

router.put(
	"/:id",
	[
		check("id", "No es un ID válido").isMongoId(),
		// check("id").custom(existUserById),
		// check("rol").custom(isRoleValid),
		validateFields,
	],
	busRoutePut
);


router.post(
	"/",
	[
		check("number", "El número de la ruta es obligatorio").not().isEmpty(),
		validateFields,
	],
	busRoutePost
);

router.delete(
	"/:id",
	[
		validateJWT,
		hasRole("ADMIN_ROLE"),
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existBusRouteById),
		validateFields,
	],
	busRouteDelete
);

router.put(
	"/:id/comments",
	[
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existBusRouteById),
		validateFields,
	],
	addComment
);

module.exports = router;