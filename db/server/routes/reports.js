var express = require("express");
var router = express.Router();
var mongo = require("../connection");
var ObjectId = require("mongodb").ObjectID;

router.get("/", function(req, res) {
  const db1 = mongo.get().collection("reports");
  db1.find({}).toArray(function(err, result) {
    if (!err) res.send(result);
    else res.send("Error");
  });
});

router.post("/getReport", async function(req, res) {
  const db1 = mongo.get().collection("reports");
  await db1
    .find({ register: req.body.regnum.toString() })
    .toArray(function(err, result) {
      if (err) res.send(err);
      else res.send(result);
    });
});

router.post("/reportid", async function(req, res) {
  const db1 = mongo.get().collection("reports");

  var details = {
    id: req.body.id
  };

  db1.remove({ _id: ObjectId(details.id) }, function(err, result) {
    if (err) res.send(err);
    else res.send("Deleted");
  });
});

router.post("/findreport", async function(req, res) {
  const db1 = mongo.get().collection("reports");

  var fields = {
    dept: req.body.dept,
    college: req.body.college,
    year: req.body.year.toString()
  };

  db1.find(fields).toArray((err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

module.exports = router;
