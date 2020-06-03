const express = require('express');
const logger = require('../util/log/logger');
const Group = require('../model/group');

const router = express.Router();

router.get('/', (req, res) => {
  Group.find((error, groups) => {
    if (error) return logger.error(error);
    return res.send(groups);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const group = new Group(req.body);
  group.save((error, newGroup) => {
    if (error) return logger.error(error);
    res.status(201);
    return res.send(newGroup);
  });
});

router.patch('/:id/', (req, res) => {
  Group.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedGroup) => {
      if (error) return logger.error(error);
      if (!updatedGroup) res.status(404);
      return res.send(updatedGroup);
    },
  );
});

router.delete('/:id/', (req, res) => {
  Group.findByIdAndDelete(req.params.id, (error) => {
    if (error) return logger.error(error);
    return res.send({ message: 'success' });
  });
});

module.exports = router;
