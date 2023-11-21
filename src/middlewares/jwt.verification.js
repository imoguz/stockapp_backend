"use strict";

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    req.user = err ? null : decoded;
  });
  next();
};
