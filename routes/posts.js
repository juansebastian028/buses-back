const { Router } = require("express");
const { check } = require("express-validator");

const {
	validateFields,
	validateJWT,
	hasRole,
} = require("../middlewares");

const {
    existPostById,
} = require("../helpers/db-validators");

const {
    getPost,
	getPosts,
    createPost,
	updatePost,
	deletePost,
} = require("../controllers/posts"); 

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);

router.put(
	"/:id",
	[
        validateJWT,
		hasRole("ADMIN_ROLE"),
		check("id", "No es un ID válido").isMongoId(),
		validateFields,
	],
	updatePost
);


router.post(
	"/",
	[
        validateJWT,
		hasRole("ADMIN_ROLE"),
		validateFields,
	],
	createPost
);

router.delete(
	"/:id",
	[
		validateJWT,
		hasRole("ADMIN_ROLE"),
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existPostById),
		validateFields,
	],
	deletePost
);

module.exports = router;