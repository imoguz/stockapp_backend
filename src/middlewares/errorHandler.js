"use strict";
const mongoose = require("mongoose");
module.exports = (err, req, res, next) => {
  if (
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError
  )
    res.errStatusCode = 400;
  res.status(res.errStatusCode || 500).send({
    error: true,
    message: err.message,
    body: req.body,
  });
};
