"use strict";

const router = require("express").Router();

const {
  create,
  readOne,
  readMany,
  update,
  _delete,
  login,
} = require("../controllers/googleUser.controller");

router.route("/").get(readMany).post(create);
router.route("/login").post(login);

router.route("/:id").get(readOne).put(update).delete(_delete);

module.exports = router;
