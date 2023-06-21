const httpStatus = require("http-status");
const User = require("../models/User");
const Family = require("../models/Family");
const Neighborhood = require("../models/Neighborhood");
const catchAsync = require("../utils/catchAsync");

exports.getUser = catchAsync(async (req, res) => {
  const { userID } = req.params;
  const fields = req.query.fields ? req.query.fields.split(",") : [];

  const user = await User.findById(userID)
    .select(fields.join(" "))
    .populate("neighborhood");
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      error: {
        message: "User not found",
      },
    });
  }
  // Remove password from response
  user.password = undefined;
  res.json({
    success: true,
    data: user,
  });
});

exports.getUserFamily = catchAsync(async (req, res) => {
  const { userID } = req.params;
  const fields = req.query.fields ? req.query.fields.split(",") : [];

  const user = await User.findById(userID);
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      error: {
        message: "User not found",
      },
    });
  }

  // Use Family model to find all relatives for the user.
  const relatives = await Family.find({ userID: user._id }).populate({
    path: "relativeID",
    select: fields.join(" "),
    model: "User",
  });

  // No relatives found.
  if (!relatives.length) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      error: {
        message: "No relatives found for this user.",
      },
    });
  }

  // Create a response array to hold relative information.
  const response = relatives.map((relative) => ({
    relationType: relative.relationType,
    relative: relative.relativeID,
  }));

  res.json({
    success: true,
    data: response,
  });
});

exports.getNeighborhood = catchAsync(async (req, res) => {
  const { neighborhoodID } = req.params;

  const neighborhood = await Neighborhood.findById(neighborhoodID);
  if (!neighborhood) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      error: {
        message: "Neighborhood not found",
      },
    });
  }

  res.json({
    success: true,
    data: neighborhood,
  });
});
