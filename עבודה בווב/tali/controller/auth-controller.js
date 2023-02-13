const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || password !== user.password) {
            res.sendStatus(401);
        }
        else {            
            var token = jwt.sign({ userEmail: user.email }, secretKey, {
                expiresIn: "2h",
            });

            res.status(200).send({
                token,
                name: user.name,
                userType: user.userType,
                email: user.email,
                phone: user.phone,
            });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).json(newUser);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};