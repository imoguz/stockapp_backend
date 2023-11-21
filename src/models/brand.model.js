"use strict";

const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { collection: "brands", timestamps: true }
);

module.exports = model("Brand", brandSchema);
