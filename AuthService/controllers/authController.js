const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

exports.register = catchAsync(async (req, res) => {
  const { username, password, email, biography, neighborhood, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
    email,
    biography,
    neighborhood,
    role,
  });

  await user.save();

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "User registered successfully.",
    data: null,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Invalid username or password.",
      data: null,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Invalid username or password.",
      data: null,
    });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Logged in successfully.",
    data: { token },
  });
});
