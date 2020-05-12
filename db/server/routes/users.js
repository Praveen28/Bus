var express = require("express");
var router = express.Router();
var mongo = require("../connection");
var ObjectId = require("mongodb").ObjectID;

router.get("/get-coordinators", function(req, res) {
  const db1 = mongo.get().collection("user_role");

  db1.find({ role: "C" }).toArray(function(err, result) {
    if (!err) res.send(result);
    else res.send("Error");
  });
});

router.get("/get-facultys", function(req, res) {
  const db1 = mongo.get().collection("user_role");

  db1.find({ role: "U" }).toArray(function(err, result) {
    if (!err) res.send(result);
    else res.send("Error");
  });
});

router.post("/delete", async function(req, res) {
  const db1 = mongo.get().collection("user_role");

  var details = {
    id: req.body.id
  };

  db1.remove({ _id: ObjectId(details.id) }, function(err, result) {
    if (err) res.send(err);
    else res.send("Deleted");
  });
});

module.exports = router;
