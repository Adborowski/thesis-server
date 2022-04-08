const express = require("express");
const router = express.Router();
const Task = require("./models/task");
const File = require("./models/file");
const path = require("path");
const multer = require("multer");
let bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const UPLOAD_FILES_DIR = "/uploads";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, UPLOAD_FILES_DIR);
  },
});
const upload = multer({ storage });

router.post("/create-task", function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  console.log(req.files);
  console.log(req.uploadedFiles);
  console.log(req.taskFiles);
  res.send("lol");
});

// router.post("/upload-media", upload.any("task_media"), (req, res) => {
//   console.log("req.body", req.body);
//   console.log("req.file", req.file);
//   console.log("req.files", req.files);
//   console.log("req.body.file", req.body.file);
//   console.log("req.body.files", req.body.files);
//   res.json({
//     success: true,
//     media: {
//       photo: req.file,
//     },
//   });
// });

router.post("/upload-media", upload.single("task_media"), function (req, res) {
  console.log(req.files, "files"); // files works for single
  res.json({ files: req.files });
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
