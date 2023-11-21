"use strict";

const Category = require("../models/category.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Categories"]
      #swagger.summary = "Create Category"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "name": "String",
          }
        }
    */

    const data = await Category.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Categories"]
      #swagger.summary = "Get Single Category"
    */

    const data = await Category.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Categories"]
      #swagger.summary = "List Categorys"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Category);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Categories"]
      #swagger.summary = "Update Category"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "name": "String",
          }
        }
    */

    const data = await Category.findByIdAndUpdate(
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
      #swagger.tags = ["Categories"]
      #swagger.summary = "Delete Category"
    */
    const data = await Category.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
