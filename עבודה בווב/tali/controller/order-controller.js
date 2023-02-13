const mongoose = require("mongoose");
const Order = require("../models/order-model");

exports.createOrdersCollection = async (req, res) => {
    try {
        await Order.createCollection();

        const orders = [];
        for (let i = 1; i <= 5; i++) {
            orders.push(
                await Order.create({
                    userEmail: `user${i}@gmail.com`,
                    salonName: `salon${i}`,
                    date: new Date().getTime(),
                })
            );
        }

        res.status(200).json(orders);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();

        res.status(200).json(newOrder);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        if (orders.length) {
            res.status(200).json(orders);
        } else {
            res.status(200).json([]);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.getOrdersByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const orders = await Order.find({ userEmail: email });

        if (orders.length) {
            res.status(200).json(orders);
        } else {
            res.status(200).json([]);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.removeOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findOneAndDelete({ _id: id });

        res.status(200).json({
            message: "The order was deleted successfully",
        });
        
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.dropOrders = async (req, res) => {
    try {
        mongoose.connection.db
            .listCollections({ name: "orders" })
            .next(async function (err, collinfo) {
                if (collinfo) {
                    await mongoose.connection.db.collection("orders").drop();
                    res.status(200).json({
                        message: "orders collection has dropped",
                    });
                } else {
                    res.status(200).json({
                        message: "orders collection was not found",
                    });
                }
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};