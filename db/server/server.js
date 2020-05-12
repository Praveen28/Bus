const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const routes = require("./routes/index");
const mongo = require("./connection");

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(morgan("combined"));

mongo.connect(function(err, client) {
  if (err) console.log(err);
  else console.log("MongoDB has been connected successfully...!");
});

app.use("/bus", routes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.listen(port, () => {
  console.log("Server is running on port " + port + "!");
});

module.exports = app;
