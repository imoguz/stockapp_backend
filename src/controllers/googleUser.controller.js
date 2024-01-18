"use strict";

const GoogleUser = require("../models/googleUser.model");
const setGoogleUserToken = require("../helpers/setGoogleUserToken");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["GoogleUsers"]
      #swagger.summary = "Create GoogleUser"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "firstname": "String",
          "lastname": "String",
          "email": "String",
          "uid": "String",
          "image": "String",
          }
        }
    */
    const data = await GoogleUser.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["GoogleUsers"]
      #swagger.summary = "Get Single GoogleUser"
    */
    if (req.params.id != req.user?._id && !req.user?.isAdmin) {
      throw new Error(
        "You do not have permission to view other users' information"
      );
    }
    const data = await GoogleUser.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["GoogleUsers"]
      #swagger.summary = "List GoogleUsers"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const filter =
      req.user?.isAdmin || req.user?.isStaff ? {} : { _id: req.user?._id };

    const data = await req.queryHandler(GoogleUser, "", filter);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Update User"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "firstname": "String",
          "lastname": "String",
          "email": "String",
          "uid": "String",
          "image": "String",
          "isActive": "Boolean",
          }
        }
    */

    const data = await GoogleUser.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(202).send(data);
  },

  _delete: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Delete User"
    */

    const data = await GoogleUser.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },

  login: async (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'JWT: Login'
      #swagger.description = 'Login with username and password'
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "email": 'String',
          "uid": 'String',
        }
      }
    */
    const data = await setGoogleUserToken(req.body);
    if (data.error) {
      res.status(401).send(data.error);
    } else {
      res.send(data);
    }
  },
};
