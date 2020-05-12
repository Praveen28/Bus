const express = require("express");
const router = express.Router();

const addStudent = require("./addStudent");
const readStudent = require("./readStudent");
const updateStudent = require("./updateStudent");
const reportStudent = require("./reportStudent");
const reports = require("./reports");
const user = require("./user");
const users = require("./users");

router.use("/add", addStudent);
router.use("/read", readStudent);
router.use("/update", updateStudent);
router.use("/reportstudent", reportStudent);
router.use("/reports", reports);
router.use("/user", user);
router.use("/users", users);

module.exports = router;
