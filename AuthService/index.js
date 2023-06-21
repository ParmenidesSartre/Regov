const express = require("express");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const User = require("./models/User");
const Family = require("./models/Family");
const Neighborhood = require("./models/Neighborhood");
const authRoutes = require("./routes/auth");
const { users, families, neighborhoods } = require("./seed/seedData");

// dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost/mydatabase";

app.use(express.json());

// Error logging middleware
app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});


// Connect to MongoDB and seed data
const connectDBAndSeedData = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Seed data
    const [usersResult, familiesResult, neighborhoodsResult] = await Promise.all([
      User.insertMany(users),
      Family.insertMany(families),
      Neighborhood.insertMany(neighborhoods),
    ]);
    console.log("Seed data inserted");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

// Routes
app.use("/api/v1/auth", authRoutes);

// Not found middleware
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

// Start the server
connectDBAndSeedData().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
