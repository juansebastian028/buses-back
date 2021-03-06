const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
	// const { limite = 5, desde = 0 } = req.query;
	const query = { estado: true };

	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query)//.skip(Number(desde)).limit(Number(limite)),
	]);

	res.json({
		total,
		users,
	});
};

const usersPost = async (req, res = response) => {
	const { name, email, password, rol } = req.body;
	const user = new User({ name, email, password, rol });

	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);

	// Guardar en BD
	await user.save();

	res.json(user);
};

const usersPut = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, google, email, ...resto } = req.body;

	if (password) {
		// Encriptar la contraseña
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}

	const user = await User.findByIdAndUpdate(id, resto, {new: true});

	res.json(user);
};

const usersDelete = async (req, res = response) => {
	const { id } = req.params;
	const user = await User.findByIdAndUpdate(id, { estado: false }, {new: true});

	res.json(user);
};

const addBusRouteToFavourites =  async (req, res = response) => {
	const { id } = req.params;
	const { busRouteId } = req.body;
	console.log(id, busRouteId);
	const user = await User.findByIdAndUpdate(id, { $push: { favouritesBusRoutes: busRouteId } }, {new: true} ).populate('favouritesBusRoutes');
	res.json( user );
};

const removeBusRouteFromFavourites =  async (req, res = response) => {
	const { id } = req.params;
	const { busRouteId } = req.body;
	console.log(id, busRouteId);
	const user = await User.findByIdAndUpdate(id, { $pull: { favouritesBusRoutes: busRouteId } }, {new: true} ).populate('favouritesBusRoutes');
	res.json( user );
};

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersDelete,
	addBusRouteToFavourites,
	removeBusRouteFromFavourites
};