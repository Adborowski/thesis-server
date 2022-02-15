const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("../thesis-app/build"));

// prettier-ignore
app.use("/data", (req, res, next) => {
  console.log("In the /data route");
  res.send({"id": "a1"});
});

app.use("/", (req, res, next) => {
  console.log("In the / route");
});

const port = 3000;
console.log(`Server running`);
app.listen(port);
