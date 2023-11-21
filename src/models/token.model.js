"use strict";

const { Schema, model } = require("mongoose");

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
  },
  {
    collection: "tokens",
    timestamps: true,
  }
);

module.exports = model("Token", tokenSchema);
