const express = require('express');
const router = express.Router();
const Task = require('./models/task');

router.get('/tasks', (req, res, next) => {
    // get tasks
        res.send('I am task data');
        Task.find({}, 'title')
        .then((data) => res.json(data))
        .catch(next);
  });
  
router.post('/tasks', (req, res, next) => {
// post task
});
  
router.delete('/tasks/:id', (req, res, next) => {
// delete task
});
  
module.exports = router;
  