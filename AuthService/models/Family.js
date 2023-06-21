const mongoose = require("mongoose");

const FamilySchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  relativeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  relationType: {
    type: String,
    enum: ["Parent", "Child", "Sibling", "Spouse", "Grandparent", "Grandchild"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Family = mongoose.model("Family", FamilySchema);

module.exports = Family;
