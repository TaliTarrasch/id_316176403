const mongoose = require("mongoose");
const Salon = require("../models/salon-model");

exports.createSalonsCollection = async (req, res) => {
    try {
        await Salon.createCollection();

        const salons = [];
        const addresses = ['Tel Aviv', 'Holon', 'Beer Sheva', 'Afula', 'Ashdod', 'Ramat Gan', 'Kfar Saba'];
        
        for (let i = 1; i <= 5; i++) {
            salons.push(
                await Salon.create({
                    salonName: `salon${i}`,
                    rating: randomIntFromInterval(1, 5),
                    address: addresses[randomIntFromInterval(0, 6)],
                    logo: `../static/salon${i}.png`,
                    openingHours: [
                        "07:00",
                        "08:00",
                        "09:00",
                        "10:00",
                        "11:00",
                        "12:00",
                        "13:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                        "19:00",
                        "20:00",
                    ],
                })
            );
        }

        res.status(200).json(salons);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.createSalon = async (req, res) => {
    try {
        const newSalon = new Salon(req.body);
        await newSalon.save();

        res.status(200).json(newSalon);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.getSalons = async (req, res) => {
    try {
        const salons = await Salon.find({});
        if (salons.length) {
            res.status(200).json(salons);
        } else {
            res.status(200).json([]);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.searchSalons = async (req, res) => {
    try {
        const { address, time } = req.query;
        let options = {
            address: {
                $regex: address,
                $options: 'i'
            },
            openingHours: time < 10 ? `0${time}:00` : `${time}:00`,
        };

        const salons = await Salon.find(options);

        if (salons.length) {
            res.status(200).json(salons);
        } else {
            res.status(200).json([]);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.dropSalons = async (req, res) => {
    try {
        mongoose.connection.db
            .listCollections({ name: "salons" })
            .next(async function (err, collinfo) {
                if (collinfo) {
                    await mongoose.connection.db.collection("salons").drop();
                    res.status(200).json({
                        message: "salons collection has dropped",
                    });
                } else {
                    res.status(200).json({
                        message: "salons collection was not found",
                    });
                }
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}