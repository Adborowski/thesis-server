const express = require('express');
const router = express.Router();
const Task = require('./models/task');

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