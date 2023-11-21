"use strict";

const crypto = require("crypto");

module.exports = (password) => {
  return crypto
    .pbkdf2Sync(password, process.env.SALT, 10000, 32, "sha512")
    .toString("hex");
};
