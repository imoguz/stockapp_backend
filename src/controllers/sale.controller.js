"use strict";

const Sale = require("../models/sale.model");
const Product = require("../models/product.model");
const sendEmail = require("../helpers/sendEmail");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Sales"]
      #swagger.summary = "Create Sale"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "String",
          "brand_id": "String",
          "product_id": "String",
          "quantity": "Number",
          "price": "Number",
          }
        }
    */

    req.body.userId = req.user._id;
    const product = await Product.findOne({
      _id: req.body.productId,
      quantity: { $gte: req.body.quantity },
    });
    if (!product) {
      res.statusCode = 422;
      throw new Error("There are not enough products in stock.");
    }
    const data = await Sale.create(req.body);
    await Product.findByIdAndUpdate(
      { _id: data.productId },
      { $inc: { quantity: -data.quantity } },
      { new: true }
    );

    const to = process.env.ADMIN_MAIL,
      subject = "Sale",
      html = `
        <h3>Information about the sales transaction</h3>
        <ul>
          <li>Staff: ${req.user?.username}</li>
          <li>Product: ${product?.name}</li>
          <li>Quantity: ${data.quantity}</li>
          <li>Price: ${data.price}</li>
          <li>Total Price: ${data.totalPrice}</li>
        </ul>`;
    sendEmail(to, subject, html); // sending email to Admin
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Sales"]
      #swagger.summary = "Get Single Sale"
    */

    const data = await Sale.findOne({ _id: req.params.id }).populate(
      "productId",
      "brandId"
    );
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Sales"]
      #swagger.summary = "List Sales"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Sale, ["productId", "brandId"]);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Sales"]
      #swagger.summary = "Update Sale"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "String",
          "brand_id": "String",
          "product_id": "String",
          "quantity": "Number",
          "price": "Number",
          }
        }
    */
    if (req.body.quantity) {
      const preQuantity = await Sale.findOne({ _id: req.params.id });
      const updateProduct = await Product.updateOne(
        {
          _id: preQuantity.productId,
          quantity: { $gte: req.body?.quantity - preQuantity?.quantity },
        },
        { $inc: { quantity: preQuantity?.quantity - req.body?.quantity } },
        { new: true }
      );
      if (!updateProduct.modifiedCount) {
        res.statusCode = 422;
        throw new Error("There are not enough products in stock.");
      }
    }

    const data = await Sale.findByIdAndUpdate(
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
      #swagger.tags = ["Sales"]
      #swagger.summary = "Delete Sale"
    */
    const data = await Sale.findOneAndDelete({ _id: req.params.id });
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: data.productId },
      { $inc: { quantity: data.quantity } },
      { new: true }
    );

    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
