var express = require("express");
var router = express.Router();
const mongo = require("../connection");

router.post("/", function(req, res) {
  const db1 = mongo.get().collection("sample");
  db1.insert({ _id: req.body.id, details: [{ name: req.body.name }] });
});

module.exports = router;
