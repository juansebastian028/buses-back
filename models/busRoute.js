const { Schema, model } = require("mongoose");

const BusRouteSchema = Schema({
  number: {
    type: String,
    required: [true, "El número de la ruta es obligatorio"],
  },
  journeys: {
    type: Object,
    outward: [],
    return: [],
  },
  coords: {
    type: Object,
    outward: [],
    return: [],
  },
  state: {
    type: Boolean,
    default: true,
  },
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      value: String,
      date: Date,
      rating: Number,
    },
  ],
});

BusRouteSchema.methods.toJSON = function () {
  const { __v, _id, ...busRoute } = this.toObject();
  busRoute.uid = _id;
  return busRoute;
};

module.exports = model("BusRoute", BusRouteSchema);
