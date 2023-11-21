"use strict";

const Firm = require("../models/firm.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Firms"]
      #swagger.summary = "Create Firm"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "name": "String",
          "phone": "String",
          "address": "String",
          "image": "String",
          }
        }
    */

    const data = await Firm.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Firms"]
      #swagger.summary = "Get Single Firm"
    */

    const data = await Firm.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Firms"]
      #swagger.summary = "List Firms"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Firm);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Firms"]
      #swagger.summary = "Update Firm"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "name": "String",
          "phone": "String",
          "address": "String",
          "image": "String",
          }
        }
    */

    const data = await Firm.findByIdAndUpdate(
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
      #swagger.tags = ["Firms"]
      #swagger.summary = "Delete Firm"
    */
    const data = await Firm.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
