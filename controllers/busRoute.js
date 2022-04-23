const { response, request } = require("express");

const BusRoute = require("../models/busRoute");

const busRouteGet = async (req = request, res = response) => {
	const query = { state: true };
	const busRoutes = await BusRoute.find(query);

	res.json({
		busRoutes,
	});
};

const busRoutePost = async (req, res = response) => {
	const { number, journeys, coords } = req.body;
	const busRoute = new BusRoute({ number, journeys, coords });
	await busRoute.save();
	res.json(busRoute);
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