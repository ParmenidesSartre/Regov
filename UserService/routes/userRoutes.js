const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {
  getUser,
  getUserFamily,
  getNeighborhood,
} = require("../validation/validation");
const userController = require("../controllers/userController");

const router = express.Router();

// User Data Routes
router
  .route("/:userID")
  .get(isAuthenticated, validate(getUser), userController.getUser);

router
  .route("/:userID/family")
  .get(isAuthenticated, validate(getUserFamily), userController.getUserFamily);

// Neighborhood Data Route
router
  .route("/neighborhoods/:neighborhoodID")
  .get(
    isAuthenticated,
    validate(getNeighborhood),
    userController.getNeighborhood
  );

module.exports = router;
