const express = require("express");

const {
    createOrdersCollection,
    createOrder,
    getOrders,
    getOrdersByEmail,
    removeOrder,
    dropOrders,
} = require("../controller/order-controller");

const router = express.Router();

router.route("/orders/create").get(createOrdersCollection);
router.route("/orders/insert").post(createOrder);
router.route("/orders/select").get(getOrders);
router.route("/orders/selectByUserEmail").get(getOrdersByEmail);
router.route("/orders/remove/:id").delete(removeOrder);
router.route("/orders/drop").get(dropOrders);

module.exports = router;
