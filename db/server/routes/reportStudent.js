var express = require("express");
var router = express.Router();
var mongo = require("../connection");

router.post("/", async function(req, res) {
  const db1 = mongo.get().collection("reports");

  var details = {
    register: req.body.details[0].register,
    name: req.body.details[0].name,
    rollnumber: req.body.details[0].rollnumber,
    college: req.body.details[0].college,
    dept: req.body.details[0].dept,
    year: req.body.details[0].year,
    area: req.body.details[0].area,
    type: req.body.details[0].type,
    date: Date.now()
  };

  if (
    !details.register ||
    !details.name ||
    !details.rollnumber ||
    !details.college ||
    !details.dept ||
    !details.year ||
    !details.area ||
    !details.type
  ) {
    res.send(details);
  } else {
    await db1.insert(details);
    res.send("Inserted to Database");
  }
});

module.exports = router;
