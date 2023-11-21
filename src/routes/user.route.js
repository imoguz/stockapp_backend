"use strict";

const router = require("express").Router();

const { isLogin } = require("../middlewares/permissions");
const {
  create,
  verify,
  readOne,
  readMany,
  update,
  _delete,
} = require("../controllers/user.controller");

router.route("/verify").get(verify);

router.route("/").get(isLogin, readMany).post(create);

router
  .route("/:id")
  .get(isLogin, readOne)
  .put(isLogin, update)
  .delete(isLogin, _delete);

module.exports = router;
