const { StatusCodes } = require("http-status-codes");
const User = require("../models/userSchema");
const { BadRequestError, NotFoundError } = require("../errors");

const register = async (req, res) => {
  const { email, firstName, lastName, password, role, tel } = req.body;
  if (!email || !firstName || !lastName || !role || !tel || !password) {
    throw new BadRequestError(
      "Please provide a valid name, email, password and role"
    );
  }
  const user = await User.create({ ...req.body });
  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { name: user.name, userID: user._id, email: user.email },
    token,
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find().sort({ createdAd: -1 });
  if (users.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No users found" });
    return;
  }
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(
      "Please provide a valid email, role and password"
    );
  }
  //
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError(
      "User not found, please provide a valid email and password"
    );
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new BadRequestError(
      "Please provide a valid email, name and password"
    );
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

module.exports = { login, register, getAllUsers };
