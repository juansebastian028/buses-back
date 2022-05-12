const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const validaRoles = require("../middlewares/validate-roles");
const validateUploadFile = require("../middlewares/validate-upload-file");

module.exports = {
	...validateFields,
	...validateJWT,
	...validaRoles,
	...validateUploadFile
};