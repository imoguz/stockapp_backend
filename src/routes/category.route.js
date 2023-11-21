"use strict";

const router = require("express").Router();
const { isStaff } = require("../middlewares/permissions");
const {
  create,
  readOne,
  readMany,
  update,
  _delete,
} = require("../controllers/category.controller");

router.use(isStaff);

router.route("/").get(readMany).post(create);
router.route("/:id").get(readOne).put(update).delete(_delete);

module.exports = router;
