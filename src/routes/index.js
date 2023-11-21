"use strict";

const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/tokens", require("./token.route"));
router.use("/users", require("./user.route"));
router.use("/googleUsers", require("./googleUser.route"));
router.use("/brands", require("./brand.route"));
router.use("/categories", require("./category.route"));
router.use("/firms", require("./firm.route"));
router.use("/products", require("./product.route"));
router.use("/purchases", require("./purchase.route"));
router.use("/sales", require("./sale.route"));
router.use("/documents", require("./document"));

module.exports = router;
