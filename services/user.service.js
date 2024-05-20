const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

const createUser = async (email, password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashedpassword,
      //role,
    });
    return newUser;
  } catch (error) {
    throw new Error("error occured while creating user");
  }
};

const findUserByEmail = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    return user;
  } catch (error) {
    throw new Error("error occured while finding a user by email");
  }
};

const findUserByToken = async (token) => {
  try {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpires: { $gt: Date.now() },
    });
    return user;
  } catch (error) {
    throw new Error("error occured while finding a user by email");
  }
};

module.exports = { createUser, findUserByEmail, findUserByToken };
