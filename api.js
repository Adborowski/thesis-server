const express = require('express');
const router = express.Router();
const Task = require('./models/task');
const File = require ('./models/file');
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});
//https://dev.to/ibrahimshamma99/upload-file-via-mern-stack-rocket-528l
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("myfile");

const obj =(req,res) => {
  upload(req, res, () => {
     console.log("Request ---", req.body);
     console.log("Request file ---", req.file);//Here you get file.
     const file = new File();
     file.meta_data = req.file;
     file.save().then(()=>{
     res.send({message:"uploaded successfully"})
     })
     /*Now do where ever you want to do*/
  });
}

router.route('/upload-media').post((req, res, next) => {
  console.log(req.body);
  File.create(req.body, (error, data) => {
      if (error) {
          console.log(error);
          return next(error)
      } else {
          console.log(data)
          res.json(data)
      }
  })
});

router.route('/create-task').post((req, res, next) => {
  console.log(req.body);
  Task.create(req.body, (error, data) => {
      if (error) {
          console.log(error);
          return next(error)
      } else {
          console.log(data)
          res.json(data)
      }
  })
});

router.get('/tasks', (req, res, next) => {
    Task.find()
    .then((data) => res.json(data))
    .catch(next);
  });
  
router.delete('/tasks/:id', (req, res, next) => {
res.send(req.params.id);
});

module.exports = router