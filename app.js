const express = require("express");
const cors = require("cors");

const https = require("https");
const http = require("http");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const morgan = require("morgan");
const _ = require("lodash");
const routes = require("./api");
let bodyParser = require("body-parser");
const multer = require("multer");
const File = require("./models/file");

require("dotenv").config();

// Connect to the database
const mongoose = require("mongoose");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DB, connectionParams)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;
const db = mongoose.connection;

const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));

// report errors
app.use((err, req, res, next) => {
  console.log(err);
  next();
});

// Listen to both http & https ports
const httpServer = http.createServer(app);
// const httpsServer = https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/live/tiszuk.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/tiszuk.com/fullchain.pem'),
// }, app);

httpServer.listen(81, () => {
  console.log("HTTP Server running on port 81");
});

// httpsServer.listen(443, () => {
//   console.log("HTTPS Server running on port 443");
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// www.domain.com/route
app.use(routes);

// serve the frontend from the 'public' folder (react's 'build' folder)
app.use(express.static("public"));
