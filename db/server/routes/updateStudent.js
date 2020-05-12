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

router.post("/", async function(req, res) {
  const db1 = mongo.get().collection("details");

  let details = {
    _id: parseInt(req.body.regnum),
    name: req.body.name,
    rollnumber: req.body.rollnumber,
    college: req.body.college,
    dept: req.body.dept,
    year: req.body.year,
    area: req.body.area,
    type: req.body.type,
    status: req.body.status
  };

  db1.update({ _id: details._id }, { $set: details }, function(err, result) {
    if (!err) res.send("Updated");
    else res.send(err);
  });
});

router.post("/update-bulk", upload.single("file"), (req, res) => {
  var db = mongo.get().collection("details");

  if (req.file.mimetype === "text/csv") {
    var results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", data => {
        results.push(data);
      })
      .on("end", () => {
        var data = results.map(item => {
          return item.register;
        });
        var message = [];
        var numbers = /^[0-9]+$/;
        db.find({ register: { $in: data } }).toArray((err, result) => {
          var data = result.map(item => {
            return item.register;
          });
          for (var i = 0; i < results.length && data.length; i++) {
            if (data[i] !== results[i].register) {
                  message.push({
                    status: 0,
                    msg:
                      "No user found with the register number at column " + (i + 1)
                  });
                  continue;
                }
                if (results[i].register === "" || results[i].register.length > 10) {
                  message.push({
                    status: 0,
                    msg: "Invalid register number found at column " + (i + 1)
                  });
                  continue;
                }
                if (results[i].name === "" || results[i].name.match(numbers)) {
                  message.push({
                    status: 0,
                    msg: "Invalid name found at column " + (i + 1)
                  });
                  continue;
                }
                if (
                  results[i].rollnumber === "" ||
                  results[i].rollnumber.length > 8
                ) {
                  message.push({
                    status: 0,
                    msg: "Invalid rollnumber found at column " + (i + 1)
                  });
                  continue;
                }
                if (results[i].college === "") {
                  message.push({
                    status: 0,
                    msg: "Empty college found at column " + (i + 1)
                  });
                  continue;
                }
                if (results[i].dept === "") {
                  message.push({
                    status: 0,
                    msg: "Empty dept found at column " + (i + 1)
                  });
                  continue;
                }
                if (results[i].year === "") {
                  message.push({
                    status: 0,
                    msg: "Empty year found at column " + (i + 1)
                  });
                  continue;
                }
                if (results[i].area === "") {
                  message.push({
                    status: 0,
                    msg: "Empty area found at column " + (i + 1)
                  });
                  continue;
                }
                if (results[i].type === "") {
                  message.push({
                    status: 0,
                    msg: "Empty type found at column " + (i + 1)
                  });
                  continue;
                } else {
                  // db.update({ register: results[i].register }, { $set: results[i] });
                  message.push({
                    status: 1,
                    msg: " Column " + (i + 1) + " updated successfully.."
                  });
                }
          }
          // for (var i = 0; i < results.length && result.length; i++) {
          //   if (result[i].register !== results[i].register) {
          //     message.push({
          //       status: 0,
          //       msg:
          //         "No user found with the register number at column " + (i + 1)
          //     });
          //     continue;
          //   }
          //   if (results[i].register === "" || results[i].register.length > 10) {
          //     message.push({
          //       status: 0,
          //       msg: "Invalid register number found at column " + (i + 1)
          //     });
          //     continue;
          //   }
          //   if (results[i].name === "" || results[i].name.match(numbers)) {
          //     message.push({
          //       status: 0,
          //       msg: "Invalid name found at column " + (i + 1)
          //     });
          //     continue;
          //   }
          //   if (
          //     results[i].rollnumber === "" ||
          //     results[i].rollnumber.length > 8
          //   ) {
          //     message.push({
          //       status: 0,
          //       msg: "Invalid rollnumber found at column " + (i + 1)
          //     });
          //     continue;
          //   }
          //   if (results[i].college === "") {
          //     message.push({
          //       status: 0,
          //       msg: "Empty college found at column " + (i + 1)
          //     });
          //     continue;
          //   }
          //   if (results[i].dept === "") {
          //     message.push({
          //       status: 0,
          //       msg: "Empty dept found at column " + (i + 1)
          //     });
          //     continue;
          //   }
          //   if (results[i].year === "") {
          //     message.push({
          //       status: 0,
          //       msg: "Empty year found at column " + (i + 1)
          //     });
          //     continue;
          //   }
          //   if (results[i].area === "") {
          //     message.push({
          //       status: 0,
          //       msg: "Empty area found at column " + (i + 1)
          //     });
          //     continue;
          //   }
          //   if (results[i].type === "") {
          //     message.push({
          //       status: 0,
          //       msg: "Empty type found at column " + (i + 1)
          //     });
          //     continue;
          //   } else {
          //     // db.update({ register: results[i].register }, { $set: results[i] });
          //     message.push({
          //       status: 1,
          //       msg: " Column " + (i + 1) + " updated successfully.."
          //     });
          //   }
          // }
          res.send(message);
        });
      });
  } else {
    var data = {
      image: req.file.originalname
    };
    db.insert(data);
  }
});

module.exports = router;
