const express = require("express");

const {
    createUsersCollection,
    createUser,
    getUsers,
    dropUsers,
} = require("../controller/user-controller");

const router = express.Router();

router.route("/users/create").get(createUsersCollection);
router.route("/users/insert").post(createUser);
router.route("/users/select").get(getUsers);
router.route("/users/drop").get(dropUsers);

module.exports = router;