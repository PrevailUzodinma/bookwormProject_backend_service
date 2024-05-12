const express = require("express");
const { createUser, findUserByEmail } = require("../services/user.service.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user.model.js");
const sendEmail = require("../utils/email.js");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "User already exists",
      });
    }

    // If not, create the user and send a response
    const newUser = await createUser(email, password);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const inputValidation = validateLoginInput({ email, password });
    if (inputValidation.errors) {
      res.status(400).json(inputValidation.errors);
    }
    // check if user exists
    const existingUser = User.findUserByEmail(email);
    if (!existingUser) {
      throw new Error("User does not exist");
    }
    // take user password and compare to entered password
    const isPasswordValid = await bcrypt.compare(
      enteredPassword,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid Password");
    }

    const payload = { email };
    res.cookie("token", token, { httpOnly: true });
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "user successfully login", token });
  } catch (error) {
    console.log("Error occurred while login", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
const forgotPassword = async (req, res, next) => {
  // 1. Get user based on email address posted
  const user = await User.findOne({ email: req.body.email });
  // check if user exists
  if (!user) {
    throw new Error("We could not find the user with given email");
  }
  // 2. Generate a random reset token
  const resetToken = user.createResetPasswordToken();

  // save changes in the database
  await user.save();
  // 3. Send the token back to the user email, so user can use to reset password
  //Add reseturl that will be in email body for the user to click to reset password
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/resetPassword/${resetToken}`;
  const message = `We have received a password reset request. Please use the below link to reset your password \n\n ${resetUrl} \n\n This reset password link will be valid for 10mins`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Reset-Password Request`,
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "password reset link sent to the user email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save();

    return next(new Error("There was an error sending password reset email"));
  }
};

// writing functionality for "reset password" - when user clicks on the reset link sent to their mail

const resetPassword = async (req, res, next) => {
  // encrypt the "plain token" passed in the request url
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  // Get user whose passwordResetToken matches encrypted req.params.token and the token hasn't expired
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Token is invalid or has expired");
  }
  // Reset User password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  user.save();

  res.status(200).json({
    message: "password reset successfully",
  });
};

module.exports = { forgotPassword, resetPassword, signup, login };
