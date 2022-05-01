const { response, request } = require("express");

const BusRoute = require("../models/busRoute");

const busRouteGet = async (req = request, res = response) => {
	const query = { state: true };
	const busRoutes = await BusRoute.find(query).populate({
        path: 'comments',
        populate: {
            path: 'user',
        }
    });

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

const addComment =  async (req, res = response) => {
	const { id } = req.params;
	const { comment } = req.body;
	const busRoute = await BusRoute.findByIdAndUpdate(id, { $push: { comments: comment } }, {new: true} ).populate({
        path: 'comments',
        populate: {
            path: 'user',
        }
    });
	res.json( busRoute );
};

module.exports = {
	busRouteGet,
	busRoutePost,
	busRouteDelete,
	addComment
};