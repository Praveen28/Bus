var express = require("express");
var router = express.Router();
var mongo = require("../connection");

router.post("/login", async function(req, res) {
  var db1 = mongo.get().collection("user_role");
  var details = {
    username: req.body.username,
    pwd: req.body.password
  };

  await db1.find(details).toArray(function(err, result) {
    if (err) res.send(err);
    else res.send(result);
  });
});

router.post("/createCoordinator", async function(req, res) {
  var db1 = mongo.get().collection("user_role");
  var details = {
    username: req.body.user_name,
    pwd: req.body.password,
    role: "C",
    status: "2"
  };
  if (!details.username || !details.pwd) {
    res.send("Enter the username and password");
  } else {
    db1.find({ username: details.username }).toArray((err, result) => {
      if (result.length > 0) {
        res.send("Already field exits");
      } else {
        db1.insert(details, function(err, result) {
          if (err) console.log(err);
          else res.send("Coordinator has been added");
        });
      }
    });
  }
});

router.post("/createUser", async function(req, res) {
  var db1 = mongo.get().collection("user_role");
  var details = {
    username: req.body.username,
    pwd: req.body.password,
    role: "U",
    status: "3"
  };

  if (!details.username || !details.pwd) {
    res.send("Enter all details");
  } else {
    db1.find({ username: details.username }).toArray((err, result) => {
      if (result.length > 0) {
        res.send("Already user-id exits");
      } else {
        db1.insert(details, function(err, result) {
          if (err) console.log(err);
          else res.send("User has been added");
        });
      }
    });
  }

  await db1.insert(details, function(err, result) {
    if (err) res.send(err);
    else res.send("User has been added");
  });
});

router.post("/resetpassword", function(req, res) {
  var db1 = mongo.get().collection("user_role");

  var details = {
    username: req.body.username
  };

  db1.update({ username: details.username }, { $set: { pwd: "password" } });
});

module.exports = router;
