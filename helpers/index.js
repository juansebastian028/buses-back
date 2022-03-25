const dbValidators = require("./db-validators");
const generteJWT = require("./generte-jwt");
const googleVerify = require("./google-verify");

module.exports = {
	...dbValidators,
	...generteJWT,
	...googleVerify,
};
