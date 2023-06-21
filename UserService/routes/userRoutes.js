const express = require("express");
const validate = require("../middlewares/validate");
const {
  getUser,
  getUserFamily,
  getNeighborhood,
} = require("../validation/validation");
const userController = require("../controllers/userController");

const router = express.Router();

// User Data Routes
router.route("/:userID").get(validate(getUser), userController.getUser);

router
  .route("/:userID/family")
  .get(validate(getUserFamily), userController.getUserFamily);

// Neighborhood Data Route
router
  .route("/neighborhoods/:neighborhoodID")
  .get(validate(getNeighborhood), userController.getNeighborhood);

module.exports = router;
