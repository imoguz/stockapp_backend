"use strict";

const Product = require("../models/product.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Products"]
      #swagger.summary = "Create Product"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "brandId": "String",
          "categoryId": "String",
          "name": "String",
          "quantity": Number,
          }
        }
    */
    const isProduct = await Product.findOne({
      brandId: req.body.brandId,
      categoryId: req.body.categoryId,
      name: req.body.name,
    });

    if (isProduct) {
      return res.status(422).send("This product has already been added.");
    }
    req.body.quantity = 0; // Quantity must be 0 when created for the first time
    const data = await Product.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Products"]
      #swagger.summary = "Get Single Product"
    */

    const data = await Product.findOne({ _id: req.params.id }).populate([
      "brandId",
      "categoryId",
    ]);
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Products"]
      #swagger.summary = "List Products"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Product, ["brandId", "categoryId"]);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Products"]
      #swagger.summary = "Update Product"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "brandId": "String",
          "categoryId": "String",
          "name": "String",
          "quantity": Number,
          }
        }
    */
    const isProduct = await Product.findOne({
      brandId: req.body.brandId,
      categoryId: req.body.categoryId,
      name: req.body.name,
    });

    if (isProduct) {
      return res.status(422).send("This product has already been added.");
    }

    const data = await Product.findByIdAndUpdate(
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
      #swagger.tags = ["Products"]
      #swagger.summary = "Delete Product"
    */
    const data = await Product.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
