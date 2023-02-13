const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('users', usersSchema, 'users');
module.exports = User;