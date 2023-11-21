"use strict";

const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { collection: "products", timestamps: true }
);

module.exports = model("Product", productSchema);
