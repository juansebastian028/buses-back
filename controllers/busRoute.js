const { response, request } = require("express");

const BusRoute = require("../models/busRoute");

const busRouteGet = async (req = request, res = response) => {
	const { limite = 5, desde = 0 } = req.query;
	const query = { state: true };

	const [total, busRoute] = await Promise.all([
		BusRoute.countDocuments(query),
		BusRoute.find(query).skip(Number(desde)).limit(Number(limite)),
	]);

	res.json({
		total,
		busRoute,
	});
};

const busRoutePost = async (req, res = response) => {
	const { number, journeys } = req.body;
	console.log( number, journeys)
	const busRoute = new BusRoute({ number, journeys });


	// Guardar en BD
	await busRoute.save();

	res.json({
		busRoute,
	});
};

const busRouteDelete = async (req, res = response) => {
	const { id } = req.params;
	const busRoute = await BusRoute.findByIdAndUpdate(id, { state: false });

	res.json(busRoute);
};

module.exports = {
	busRouteGet,
	busRoutePost,
	busRouteDelete,
};