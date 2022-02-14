const http = require("http");
const fs = require("fs");
const express = require("express");

const app = express();

app.use((req, res, next) => {
  // this gets executed for every incoming request
  console.log("In a middleware");
  next(); // move to next middleware
});

app.use((req, res, next) => {
  // this gets executed for every incoming request
  console.log("In another middleware");
  res.write("<h1>hello</h1>");
  res.end;
});

const server = http.createServer(app);

server.listen(3000);
