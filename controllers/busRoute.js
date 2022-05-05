const { response, request } = require("express");

const BusRoute = require("../models/busRoute");

const busRouteGet = async (req = request, res = response) => {
	const query = { state: true };
	const busRoutes = await BusRoute.find(query);

	res.json({
		busRoutes,
	});
};

const busRoutePut = async (req, res = response) => {
	const { id } = req.params;
	const { _id, ...resto } = req.body;

	try {
		const busRoute = await BusRoute.findByIdAndUpdate(id, resto, {new: true});
		res.json(busRoute);
	} catch (err) {
		res.status(400).json({
			msg: 'Error al actualizar la ruta',
			err
		});
	}
};

const busRoutePost = async (req, res = response) => {
	const { number, journeys, coords } = req.body;
	
	try {
		const busRoute = new BusRoute({ number, journeys, coords });
		await busRoute.save();
		res.json(busRoute);
	} catch (err) {
		res.status(400).json({
			msg: 'Error al guardar la ruta',
			err
		});
	}
};

const busRouteDelete = async (req, res = response) => {
	const { id } = req.params;

	try {
		const busRoute = await BusRoute.findByIdAndUpdate(id, { state: false });
		res.json(busRoute);
	} catch (err) {
		res.status(400).json({
			msg: 'Error al eliminar la ruta',
			err
		});
	}
};

module.exports = {
	busRouteGet,
	busRoutePut,
	busRoutePost,
	busRouteDelete,
};