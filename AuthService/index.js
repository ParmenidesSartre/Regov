const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const { errorConverter, errorHandler } = require("./middlewares/error");

const app = express();

// Set security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// Log HTTP requests
app.use(morgan("combined"));

// Error logging middleware
app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

// Routes
app.use("/api/v1/auth", authRoutes);

// Not found middleware
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Convert error to ApiError
app.use(errorConverter);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
