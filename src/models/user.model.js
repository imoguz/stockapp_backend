"use strict";

const validator = require("validator");
const hashedPassword = require("../helpers/passwordEncrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      validate: {
        validator: function (password) {
          if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%*?.&])[A-Za-z\d$@$!%*?.&]{8,32}/.test(
              password
            )
          ) {
            return (this.password = hashedPassword(password));
          } else {
            return false;
          }
        },
        message:
          "Invalid password format: min 8 max 32 upper 1 lower 1 special 1 number 1",
      },
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "This email is already used."],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Please enter a valid email",
      },
    },

    image: {
      type: String,
      trim: true,
    },

    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
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
    collection: "users",
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
