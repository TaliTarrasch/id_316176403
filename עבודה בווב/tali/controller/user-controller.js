const mongoose = require("mongoose");
const User = require("../models/user-model");

exports.createUsersCollection = async (req, res) => {
    try {
        await User.createCollection();

        const users = [];
        for (let i = 1; i <= 5; i++) {
            users.push(
                await User.create({
                    fullname: `user${i}`,
                    password: "123456",
                    email: `user${i}@gmail.com`,
                })
            );
        }

        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).json(newUser);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length) {
            res.status(200).json(users);
        } else {
            res.status(200).json([]);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.dropUsers = async (req, res) => {
    try {
        mongoose.connection.db
            .listCollections({ name: "users" })
            .next(async function (err, collinfo) {
                if (collinfo) {
                    await mongoose.connection.db.collection("users").drop();
                    res.status(200).json({
                        message: "users collection has dropped",
                    });
                }
                else {
                    res.status(200).json({ message: "users collection was not found" });
                }
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
