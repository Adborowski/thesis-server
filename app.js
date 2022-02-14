const express = require("express");

const app = express();

console.log("Server running");

app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

// prettier-ignore
app.use("/data", (req, res, next) => {
  console.log("Sending JSON!");
  res.send({"id": "a1"});
});

app.use("/", (req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
