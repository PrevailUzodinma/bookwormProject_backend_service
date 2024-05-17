const express = require("express");
const {
  createUser,
  findUserByEmail,
  findUserByToken,
} = require("../services/user.service.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/email.js");
const path = require("path")

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
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

    // check if user exists

    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    // take user password and compare to entered password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Create JWT token
    const payload = { userId: existingUser._id };
    const token = jwt.sign(payload, process.env.MY_SECRET_KEY_TOKEN, {
      expiresIn: "1h",
    });

    // Set token as cookie
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ message: "user successfully login", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while login", error: error });
  }
};

const forgotPassword = async (req, res, next) => {
  // 1. Get user based on email address posted
  const user = await findUserByEmail(req.body.email);
  // check if user exists
  if (!user) {
    throw new Error("We could not find the user with given email");
  }
  // 2. Generate a random reset token
  const resetToken = user.createResetPasswordToken();

  // save changes in the database
  const checkUser = await user.save();

  // 3. Send the token back to the user email, so user can use to reset password
  //Add reseturl that will be in email body for the user to click to reset password
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
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

const getResetForm = (req, res) => {
  // Serve the HTML file for the reset password form
  res.sendFile(path.join(__dirname, "../path/to/resetPassword.html"));
};

const resetPassword = async (req, res, next) => {
  try {
    // encrypt the "plain token" passed in the request url
    const token = crypto
      .createHash("sha256")
      .update(req.params.id)
      .digest("hex");

    console.log(token);
    // Get user whose passwordResetToken matches encrypted req.params.token and the token hasn't expired
    const user = await findUserByToken(token);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Token is invalid or has expired" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const newPasswordHash = await bcrypt.hash(req.body.password, salt);
    // Reset User password
    user.password = newPasswordHash;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    user.save();

    res.status(200).json({
      message: "password reset successfully",
    });
  } catch (error) {
    // Handle any errors
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

const logout = (req, res) => {
  // Clear the token cookie from the client-side
  res.clearCookie('token');
  res.status(200).json({ message: "Logout successful" });
  };

module.exports = { forgotPassword, resetPassword, getResetForm, signup, login, logout };
