const Role = require("../models/role");
const { User, BusRoute, Post } = require("../models");

const isRoleValid = async (rol = "") => {
	const existRol = await Role.findOne({ rol });
	if (!existRol) {
		throw new Error(`El rol ${rol} no está registrado en la BD`);
	}
};

const emailExist = async (email = "") => {
	// Verificar si el email exist
	const existEmail = await User.findOne({ email });
	if (existEmail) {
		throw new Error(`El email: ${email}, ya está registrado`);
	}
};

const existUserById = async (id) => {
	// Verificar si el email exist
	const existUser = await User.findById(id);
	if (!existUser) {
		throw new Error(`El id no exist ${id}`);
	}
};

const existBusRouteById = async (id) => {
	// Verificar si el email exist
	const existBusRoute = await BusRoute.findById(id);
	if (!existBusRoute) {
		throw new Error(`El id no exist ${id}`);
	}
};
const existPostById = async (id) => {
	// Verificar si el email exist
	const existPost = await Post.findById(id);
	if (!existPost) {
		throw new Error(`El id no exist ${id}`);
	}
};
/**
 * Validar colecciones permitidas
 */
const allowedConnections = (coleccion = "", colecciones = []) => {
	const incluida = colecciones.includes(coleccion);
	if (!incluida) {
		throw new Error(
			`La colección ${coleccion} no es permitida, ${colecciones}`
		);
	}
	return true;
};

module.exports = {
	isRoleValid,
	emailExist,
	existUserById,
	existBusRouteById,
	existPostById,
	allowedConnections,
};
