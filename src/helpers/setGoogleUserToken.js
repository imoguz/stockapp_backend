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
  if (!user || !user.isActive || !user.isVerified) {
    return { error: "Incorrect user information or inactive user" };
  }
  const accessToken = jwt.sign(user.toJSON(), process.env.TOKEN_KEY, {
    expiresIn: "10m",
  });

  const refreshToken =
    refresh ||
    jwt.sign({ email, uid }, process.env.REFRESH_KEY, {
      expiresIn: "1d",
    });
  const tokenData = {
    accessToken,
    refreshToken,
    accessExpired: expiredDate(1 / 6),
    refreshExpired: expiredDate(24),
  };
  return { tokenData, user };
};
