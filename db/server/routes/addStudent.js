var express = require("express");
var router = express.Router();
var mongo = require("../connection");
var multer = require("multer");
var csv = require("csv-parser");
var fs = require("fs");

var storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + " " + file.originalname);
  }
});

var upload = multer({ storage: storage });

router.post("/", (req, res) => {
  const db1 = mongo.get().collection("details");
  let mydetails = {
    register: req.body.regnum,
    name: req.body.name,
    rollnumber: req.body.rollnumber,
    college: req.body.college,
    dept: req.body.dept,
    year: req.body.year,
    area: req.body.area,
    type: req.body.type,
    status: req.body.status
  };
  if (
    !mydetails.register ||
    !mydetails.name ||
    !mydetails.rollnumber ||
    !mydetails.dept ||
    !mydetails.college ||
    !mydetails.year ||
    !mydetails.area ||
    !mydetails.type
  )
    res.send("Send some details");
  else
    db1.find({ register: mydetails.register }).toArray((err, result) => {
      if (result.length > 0) {
        res.send("Already user exits");
      } else {
        db1.insertOne(mydetails);
        res.send("Added successfully");
      }
    });
});

router.post("/add-bulk-student", upload.single("file"), (req, res) => {
  var db = mongo.get().collection("details");

  if (req.file.mimetype === "text/csv") {
    var results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", data => {
        results.push(data);
      })
      .on("end", () => {
        var message = [];

        var data = results.map(item => {
          return item.register;
        });
        db.find({ register: { $in: data } }).toArray((err, result) => {
          var output = result.map(item => {
            return item.register;
          });

          for (var i = 0; i < results.length; i++) {
            if (output[i] === results[i].register) {
              message.push({
                status: 0,
                result: "Already user exits.Check the column number " + (i + 1)
              });
            } else {
              message.push({
                status: 1,
                result: "User has been added at the column number " + (i + 1)
              });
            }
          }
          res.send(message);
        });
      });
  } else {
    var data = {
      image: req.file.originalname
    };
    res.send(output);
  }
});

module.exports = router;
