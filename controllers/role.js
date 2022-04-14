const { response, request } = require("express");

const Role = require("../models/role");

const rolesGet = async (req = request, res = response) => {
	const query = { estado: true };

	const roles = await Role.find(query);

	res.json({
		roles,
	});
};

module.exports = {
	rolesGet
};