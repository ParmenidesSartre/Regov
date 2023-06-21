const mongoose = require("mongoose");
const userFriendlyResult = require("./plugin/userFriendlyResult");

const NeighborhoodSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

NeighborhoodSchema.plugin(userFriendlyResult);

const Neighborhood = mongoose.model("Neighborhood", NeighborhoodSchema);

module.exports = Neighborhood;
