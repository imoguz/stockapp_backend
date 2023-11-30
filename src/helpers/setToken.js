"use strict";

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const passwordEncrypt = require("./passwordEncrypt");

const expiredDate = (date) => {
  return new Date(new Date().getTime() + date * 60 * 60 * 1000);
};

module.exports = async (auth, refresh) => {
  const { email, password } = auth || null;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }
  const user = await User.findOne({
    email,
    password: passwordEncrypt(password),
  });
  if (!user || !user.isActive || !user.isVerified) {
    return { error: "Incorrect user information or inactive user" };
  }
  const accessToken = jwt.sign(user.toJSON(), process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });

  const refreshToken =
    refresh ||
    jwt.sign({ email, password }, process.env.REFRESH_KEY, {
      expiresIn: "1d",
    });

  const tokenData = {
    accessToken,
    refreshToken,
    accessExpired: expiredDate(1),
    refreshExpired: expiredDate(24),
  };
  return { tokenData, user };
};
