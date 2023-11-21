"use strict";

const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firmId: {
      type: Schema.Types.ObjectId,
      ref: "Firm",
      required: true,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: function () {
        return this.quantity * this.price;
      },
      transform: function () {
        return this.quantity * this.price;
      },
    },
  },
  { collection: "purchases", timestamps: true }
);

module.exports = model("Purchase", purchaseSchema);
