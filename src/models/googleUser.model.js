"use strict";

const { Schema, model } = require("mongoose");

const googleUserSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
    },

    lastname: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
    },

    uid: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isStaff: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "googleUsers",
    timestamps: true,
  }
);

module.exports = model("GoogleUser", googleUserSchema);
