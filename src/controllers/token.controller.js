"use strict";

const Token = require("../models/token.model");

module.exports = {
  create: async (req, res) => {
    // #swagger.ignore = true
    const data = await Token.create(req.body);
    res.status(201).send({ result: data });
  },
  readOne: async (req, res) => {
    // #swagger.ignore = true
    const data = await Token.findOne({ _id: req.params.id });
    res.status(200).send({ result: data });
  },

  readMany: async (req, res) => {
    // #swagger.ignore = true
    const data = await req.queryHandler(Token, "userId");
    res.status(200).send({ count: data?.length, result: data });
  },

  update: async (req, res) => {
    // #swagger.ignore = true
    const data = await Token.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(202).send({ result: data });
  },

  _delete: async (req, res) => {
    // #swagger.ignore = true
    const data = await Token.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount === 1 ? 204 : 404).send({ result: data });
  },
};
