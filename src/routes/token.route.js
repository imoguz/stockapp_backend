"use strict";

const router = require("express").Router();
const { isAdmin } = require("../middlewares/permissions");
const {
  create,
  readOne,
  readMany,
  update,
  _delete,
} = require("../controllers/token.controller");

router.use(isAdmin);

router.route("/").get(readMany).post(create);
router.route("/:id").get(readOne).put(update).delete(_delete);

module.exports = router;
