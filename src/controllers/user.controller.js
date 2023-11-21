"use strict";

const User = require("../models/user.model");
const encrypt = require("../helpers/passwordEncrypt");
const sendEmail = require("../helpers/sendEmail");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Create User"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "username": "String",
          "password": "String",
          "email": "String",
          "firstName": "String",
          "lastName": "String",
          }
        }
    */
    const data = await User.create(req.body);
    const to = data.email,
      subject = "Account verification",
      html = `
        <h3>Dear user,</h3>
        <h4>You have been requested to verify your A Company account:</h4>
        <h4>Verification Link:https://stockapp-green.vercel.app/stock/users/verify?id=${
          data._id
        }&verifyCode=${encrypt(data.email)}</h4>`;
    sendEmail(to, subject, html);
    res.status(201).send(data);
  },

  verify: async (req, res) => {
    // #swagger.ignore = true

    const { id, verifyCode } = req.query || null;
    const data = await User.findOne({ _id: id });
    if (!data || verifyCode != encrypt(data.email)) {
      res.send("Incorrect verification code.");
    }

    const verifiedAccount = await User.findByIdAndUpdate(
      { _id: req.query.id },
      { isVerified: true },
      {
        runValidators: true,
        new: true,
      }
    );
    if (verifiedAccount) {
      res.status(302).redirect("https://stockapp-green.vercel.app/");
      // res.json({ message: "Account successfully verified." });
    } else {
      res.status(500).send({
        message: "An error occurred during verification",
      });
    }
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Get Single User"
    */
    if (req.params.id != req.user?._id && !req.user?.isAdmin) {
      throw new Error(
        "You do not have permission to view other users' information"
      );
    }
    const data = await User.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "List Users"
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

    const data = await req.queryHandler(User, "", filter);
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
          "username": "String",
          "password": "String",
          "email": "String",
          "firstName": "String",
          "lastName": "String",
          "isActive": "Boolean",
          }
        }
    */

    if (req.params.id != req.user?._id && !req.user?.isAdmin) {
      res.statusCode = 401;
      throw new Error(
        "You do not have permission to update other users' information"
      );
    }
    if (!req.user?.isAdmin) req.body.isAdmin = false;

    const data = await User.findByIdAndUpdate(
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

    if (req.params.id != req.user?._id && !req.user?.isAdmin) {
      res.statusCode = 401;
      throw new Error(
        "You do not have permission to delete other users' information"
      );
    }

    const data = await User.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
