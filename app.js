"use strict";

const express = require("express");
const app = express();
const packagejson = require("./package.json");
require("express-async-errors");

// ----- .env variables -----
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// ----- Database Connection -----
require("./src/configs/dbConnection")();

// ----- Convert to JSON -----
app.use(express.json());

// ----- cors for all requiest -----
app.use(require("cors")());

// ----- middlewares -----
app.use(require("./src/middlewares/jwt.verification"));
app.use(require("./src/middlewares/queryHandler"));

// ----- routes -----
app.use("/stock", require("./src/routes/index"));

// ----- Home Path -----
app.all("/", (req, res) => {
  res.send({
    message: "Welcome to " + packagejson.name,
    documents: {
      swagger: "/stock/documents/swagger",
      redoc: "/stock/documents/redoc",
      json: "/stock/documents/json",
    },
    user: req.user,
  });
});

// ----- Error Handler -----
app.use(require("./src/middlewares/errorHandler"));

// ----- listenning server -----
app.listen(PORT, () => console.log("Server is running on", PORT));
