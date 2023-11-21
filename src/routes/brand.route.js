"use strict";

const router = require("express").Router();

const { isStaff } = require("../middlewares/permissions");
const {
  create,
  readOne,
  readMany,
  update,
  _delete,
} = require("../controllers/brand.controller");

router.route("/").get(isStaff, readMany).post(isStaff, create);
router
  .route("/:id")
  .get(isStaff, readOne)
  .put(isStaff, update)
  .delete(isStaff, _delete);

module.exports = router;
