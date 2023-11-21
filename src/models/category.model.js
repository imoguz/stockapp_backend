"use strict";

const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { collection: "categories", timestamps: true }
);

module.exports = model("Category", categorySchema);
