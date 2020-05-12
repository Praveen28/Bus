var express = require("express");
var router = express.Router();
var mongo = require("../connection");

router.post("/", async function(req, res) {
  const db1 = mongo.get().collection("details");
  let mydetails = {
    register: req.body.regnum
  };
  if (!mydetails.register) res.send("Send some details");
  else
    await db1
      .find({ register: mydetails.register })
      .toArray(function(err, result) {
        if (result.length === 0) res.send("No user found");
        else {
          res.send(result);
        }
      });
});

router.get("/get-students", function(req, res) {
  const db = mongo.get().collection("details");

  db.find().toArray(function(err, result) {
    if (err) throw err;
    else res.send(result);
  });
});

router.post("/delete", async function(req, res) {
  const db1 = mongo.get().collection("details");

  var details = {
    id: req.body.id
  };

  db1.remove({ _id: ObjectId(details.id) }, function(err, result) {
    if (err) res.send(err);
    else res.send("Deleted");
  });
});

module.exports = router;
