const mongoose = require("mongoose");
const userFriendlyResult = require("./plugin/userFriendlyResult");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true,
  },
  password: String,
  name: String,
  email: {
    type: String,
    unique: true,
    index: true,
  },
  biography: String,
  neighborhood: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Neighborhood",
  },
  role: {
    type: String,
    enum: ["Resident", "Authority"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

UserSchema.plugin(userFriendlyResult);

const User = mongoose.model("User", UserSchema);

module.exports = User;
