"use strict";

const Purchase = require("../models/purchase.model");
const Product = require("../models/product.model");
const sendEmail = require("../helpers/sendEmail");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Purchases"]
      #swagger.summary = "Create Purchase"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "String",
          "firm_id": "String",
          "brand_id": "String",
          "product_id": "String",
          "quantity": "Number",
          "price": "Number",
          }
        }
    */
    req.body.userId = req.user._id;
    const data = await Purchase.create(req.body);

    const updateProduct = await Product.findByIdAndUpdate(
      { _id: data.productId },
      { $inc: { quantity: data.quantity } },
      { new: true }
    );

    const to = process.env.ADMIN_MAIL,
      subject = "Purchase",
      html = `
        <h3>Information about the sales transaction</h3>
        <ul>
          <li>Staff:${req.user?.username}</li>
          <li>Product: ${data.name}</li>
          <li>Quantity:${data.quantity}</li>
          <li>Total Quantity:${updateProduct.quantity}</li>
          <li>Price:${data.price}</li>
          <li>Total Price:${data.totalPrice}</li>
        </ul>`;
    sendEmail(to, subject, html); // sending email to Admin

    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Purchases"]
      #swagger.summary = "Get Single Purchase"
    */

    const data = await Purchase.findOne({ _id: req.params.id }).populate([
      "firmId",
      "brandId",
      "productId",
    ]);
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Purchases"]
      #swagger.summary = "List Purchases"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Purchase, [
      "firmId",
      "brandId",
      "productId",
    ]);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Purchases"]
      #swagger.summary = "Update Purchase"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "String",
          "firm_id": "String",
          "brand_id": "String",
          "product_id": "String",
          "quantity": "Number",
          "price": "Number",
          }
        }
    */
    if (req.body.quantity) {
      const preQuantity = await Purchase.findOne({ _id: req.params.id });

      const updateProduct = await Product.findByIdAndUpdate(
        { _id: preQuantity.productId },
        { $inc: { quantity: req.body?.quantity - preQuantity?.quantity } },
        { new: true }
      );
    }
    const data = await Purchase.findByIdAndUpdate(
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
      #swagger.tags = ["Purchases"]
      #swagger.summary = "Delete Purchase"
    */

    const data = await Purchase.findOneAndDelete({ _id: req.params.id });

    const updateProduct = await Product.findByIdAndUpdate(
      { _id: data.productId },
      { $inc: { quantity: -data.quantity } },
      { new: true }
    );

    res.status(data ? 204 : 404).send(data);
  },
};
