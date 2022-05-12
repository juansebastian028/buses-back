const dbValidators = require("./db-validators");
const generteJWT = require("./generate-jwt");
const googleVerify = require("./google-verify");
const uploadFile = require("./upload-file");

module.exports = {
	...dbValidators,
	...generteJWT,
	...googleVerify,
	...uploadFile
};
