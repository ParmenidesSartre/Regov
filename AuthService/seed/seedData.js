const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const users = [
  {
    _id: new ObjectId(),
    username: "john_doe",
    password: "hashed_password",
    name: "John Doe",
    email: "john.doe@example.com",
    biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    neighborhoodID: new ObjectId(),
    role: "Resident",
  },
  {
    _id: new ObjectId(),
    username: "jane_smith",
    password: "hashed_password",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    neighborhoodID: new ObjectId(),
    role: "Resident",
  },
  {
    _id: new ObjectId(),
    username: "admin_user",
    password: "hashed_password",
    name: "Admin User",
    email: "admin.user@example.com",
    biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    neighborhoodID: new ObjectId(),
    role: "Authority",
  },
];

const families = [
  {
    userID: users[0]._id,
    relativeID: users[1]._id,
    relationType: "Parent",
  },
  {
    userID: users[1]._id,
    relativeID: users[0]._id,
    relationType: "Child",
  },
];

const neighborhoods = [
  {
    _id: users[0].neighborhoodID,
    name: "Community A",
    description: "A friendly and vibrant community.",
  },
  {
    _id: users[1].neighborhoodID,
    name: "Community B",
    description: "A peaceful and scenic neighborhood.",
  },
];

module.exports = { users, families, neighborhoods };
