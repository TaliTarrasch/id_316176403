const express = require("express");

const { createDb, dropDb } = require("../controller/db-controller");

const router = express.Router();

router.route("/createDB").get(createDb);
router.route("/dropDB").get(dropDb);

module.exports = router;
