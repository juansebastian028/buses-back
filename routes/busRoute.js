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
	busRouteDelete,
	addComment,
} = require("../controllers/busRoute"); 

const router = Router();

router.get("/", busRouteGet);
router.get("/:id", getBusRouteById);

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