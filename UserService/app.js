const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const userRoutes = require("./routes/userRoutes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

dotenv.config();

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// Log HTTP requests
app.use(morgan("combined"));

// Limit number of requests to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/v1/users", userRoutes);

// Default route
app.get("/", (req, res) => res.send("Hello World!"));

app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

// Convert error to ApiError
app.use(errorConverter);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
