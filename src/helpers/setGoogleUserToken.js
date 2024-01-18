"use strict";

const GoogleUser = require("../models/googleUser.model");
const jwt = require("jsonwebtoken");

const expiredDate = (date) => {
  return new Date(new Date().getTime() + date * 60 * 60 * 1000);
};

module.exports = async (auth, refresh) => {
  const { email, uid } = auth || null;

  if (!email || !uid) {
    return { error: "Email and google uid are required" };
  }
  const user = await GoogleUser.findOne({ email, uid });
  if (!user || !user.isActive) {
    return { error: "Incorrect user information or inactive user" };
  }
  const accessToken = jwt.sign(user.toJSON(), process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });

  const refreshToken =
    refresh ||
    jwt.sign({ email, uid }, process.env.REFRESH_KEY, {
      expiresIn: "1d",
    });
  const tokenData = {
    accessToken,
    refreshToken,
    accessExpired: expiredDate(2),
    refreshExpired: expiredDate(24),
  };
  return { tokenData, user };
};
