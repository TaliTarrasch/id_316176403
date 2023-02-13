const express = require("express");

const {
    createSalonsCollection,
    createSalon,
    getSalons,
    searchSalons,
    dropSalons,
} = require("../controller/salon-controller");

const router = express.Router();

router.route("/salons/create").get(createSalonsCollection);
router.route("/salons/insert").post(createSalon);
router.route("/salons/select").get(getSalons);
router.route("/salons/search").get(searchSalons);
router.route("/salons/drop").get(dropSalons);

module.exports = router;
