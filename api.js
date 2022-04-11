const express = require("express");
const router = express.Router();
const Task = require("./models/task");
const File = require("./models/file");
const multer = require("multer");
var bodyParser = require("body-parser");

const connectToDatabase = require("./db");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const db = connectToDatabase();
const fs = require("fs");
const app = express();

// create application/json parser
var jsonParser = bodyParser.json({
  limit: "50mb",
});

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post("/upload-media", upload.single("task_media"), (req, res, next) => {
  var file = req.files;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  var newUid = uuidv1();
  // req.files.task_media.data is a buffer type
  var encode_image = req.files.task_media.data.toString("base64");
  var imgUpload = new File({ name: "dbTest", id: newUid, data: encode_image });
  imgUpload.save((error, item) => {
    if (!error) {
      res.json({ status: "ok", _id: item._id, imgString: encode_image });
    }
  });
});

router.post("/create-task", jsonParser, function (req, res, next) {
  var newTask = new Task({
    id: req.body.id,
    ownerId: req.body.ownerId,
    media: req.body.media,
    title: req.body.title,
    description: req.body.description,
    reward: req.body.reward,
    latlng: req.body.latlng,
  });

  newTask.save((error, item) => {
    if (!error) {
      res.json({ message: "Task uploaded", task: item });
    } else {
      res.json({ message: "ERROR", error: error });
    }
  });
});

router.get("/tasks", (req, res, next) => {
  Task.find()
    .then((data) => res.json(data))
    .catch(next);
});

router.delete("/tasks/:id", (req, res, next) => {
  res.send(req.params.id);
});

module.exports = router;
