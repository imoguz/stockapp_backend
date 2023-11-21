"use strict";

const packagejson = require("./package.json");
const autogen = require("swagger-autogen")();

require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

const document = {
  info: {
    version: packagejson.version,
    title: packagejson.name,
    description: packagejson.description,
    termsOfService: "http://www.clarusway.com",
    contact: { name: packagejson.author, email: "imoguz0510@gmail.com" },
    license: { name: packagejson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Enter Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...token...<i></b>",
    },
  },
  security: [{ JWT: true }],
  definition: {
    "/auth/login": {
      username: {
        type: "String",
        required: true,
      },
      password: {
        type: "String",
        required: true,
      },
    },
    "/auth/refresh": {
      "token.refresh": {
        description: "{ token: { refresh: ... } }",
        type: "String",
        required: true,
      },
    },
    User: require("./src/models/user.model").schema.obj,
    Brand: require("./src/models/brand.model").schema.obj,
    Category: require("./src/models/category.model").schema.obj,
    Firm: require("./src/models/firm.model").schema.obj,
    Product: require("./src/models/product.model").schema.obj,
    Purchase: require("./src/models/purchase.model").schema.obj,
    Sale: require("./src/models/sale.model").schema.obj,
  },
};
const routes = ["./app.js"];
const outputFile = "./src/configs/swagger.json";

autogen(outputFile, routes, document);
