const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./db.config");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const dbRoutes = require("./routes/db-routes");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const orderRoutes = require("./routes/order-routes");
const salonsRoutes = require("./routes/salon-routes");

app.use(express.static(__dirname + "/client/views"));
app.use("/views", express.static(__dirname + "/client/views"));
app.use("/static", express.static(__dirname + "/client/static"));

app.use(dbRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(orderRoutes);
app.use(salonsRoutes);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    );
    next();
});

const connectDb = async () => {
    const conn = await mongoose.connect(
        `mongodb://${db.HOST}:${db.PORT}/${db.DATABASE}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
    console.log(`Connected to ${conn.connection.host} db`);
};
connectDb();

app.listen(PORT, console.log(`The server is running on port: ${PORT}`));
