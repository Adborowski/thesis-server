const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

// prettier-ignore
app.use("/data", (err, req, res, next) => {
  console.log(err);
  console.log("In the /data route");
  res.send({"id": "a1"});
});

app.use("/", (req, res, next) => {
  console.log("In the / route");
});

app.listen(3000);
