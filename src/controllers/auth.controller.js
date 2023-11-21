"use strict";

const jwt = require("jsonwebtoken");
const setToken = require("../helpers/setToken");

module.exports = {
  login: async (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'JWT: Login'
      #swagger.description = 'Login with username and password'
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "username/email": 'test',
          "password": 'Aa.12345'
        }
      }
    */
    const data = await setToken(req.body);
    if (data.error) {
      res.status(401).send(data.error);
    } else {
      res.send(data);
    }
  },

  refresh: (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'JWT: Refresh'
      #swagger.description = 'Refresh accesToken with refreshToken'
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "refresh": 'refreshToken'
        }
      }
    */
    const refresh = req.body?.refresh || null;

    jwt.verify(refresh, process.env.REFRESH_KEY, async (err, decoded) => {
      if (err) {
        res.status(403).send("invalid refresh token");
      } else {
        const Tokens = await setToken(decoded, refresh);
        if (Tokens.error) {
          res.status(401).send(Tokens.error);
        } else {
          res.send(Tokens);
        }
      }
    });
  },

  logout: (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'JWT: Logout'
      #swagger.description = 'No need to log out. You must deleted Token from your browser.'
    */
    res.send("No need to log out. You must deleted Token from your browser.");
  },
};
