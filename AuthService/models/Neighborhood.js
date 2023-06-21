const mongoose = require("mongoose");

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

const Neighborhood = mongoose.model("Neighborhood", NeighborhoodSchema);

module.exports = Neighborhood;
