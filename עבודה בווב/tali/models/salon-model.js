const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema(
    {
        salonName: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        openingHours: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

const Salon = mongoose.model("salons", salonSchema, "salons");
module.exports = Salon;
