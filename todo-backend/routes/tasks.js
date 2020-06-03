const express = require('express');
const logger = require('../util/log/logger');
const Task = require('../model/task');

const router = express.Router();

router.get('/', (req, res) => {
  Task.find((error, tasks) => {
    if (error) return logger.error(error);
    return res.send(tasks);
  });
});

router.post('/', (req, res) => {
  const task = new Task(req.body);
  task.save((error, newTask) => {
    if (error) return logger.error(error);
    res.status(201);
    return res.send(newTask);
  });
});

router.patch('/:id/', (req, res) => {
  Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedTask) => {
      if (error) return logger.error(error);
      if (!updatedTask) res.status(404);
      return res.send(updatedTask);
    },
  );
});

router.delete('/:id/', (req, res) => {
  Task.findByIdAndDelete(req.params.id, (error) => {
    if (error) return logger.error(error);
    return res.send({ message: 'success' });
  });
});

module.exports = router;
