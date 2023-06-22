const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Family = require("./models/Family");
const Neighborhood = require("./models/Neighborhood");
const { users, families, neighborhoods } = require("./seed/seedData");
const app = require("./index");

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

console.log(mongoURI)

// Connect to MongoDB and seed data
const connectDBAndSeedData = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    if (!collections.find((c) => c.name === "users")) {
      console.log("Seeding Users...");
      const data = await User.insertMany(users);
      console.log(data);
    }

    if (!collections.find((c) => c.name === "families")) {
      console.log("Seeding Families...");
      await Family.insertMany(families);
    }

    if (!collections.find((c) => c.name === "neighborhoods")) {
      console.log("Seeding Neighborhoods...");
      await Neighborhood.insertMany(neighborhoods);
    }

    console.log("Seed data inserted");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

// Start the server
connectDBAndSeedData().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
