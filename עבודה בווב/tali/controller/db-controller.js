const mongoose = require("mongoose");

exports.createDb = async (req, res) => {
    try {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.drop();
        }

        await mongoose.connection.db.createCollection('users');
        await mongoose.connection.db.createCollection("orders");
        await mongoose.connection.db.createCollection("salons");

        res.status(200).json({ message: 'DB created' });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.dropDb = async (req, res) => {
    try {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.drop();
        }

        res.status(200).json({ message: "DB dropped" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
