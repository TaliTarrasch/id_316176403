const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true,
        },
        salonName: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema, "orders");
module.exports = Order;
