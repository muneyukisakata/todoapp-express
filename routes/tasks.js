const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getSingleTasks,
  createTasks,
  uppdateTasks,
  deleteTasks,
} = require('../controllers/tasks');

router.get('/', getAllTasks);

router.post('/', createTasks);

router.get('/:id', getSingleTasks);

router.patch('/:id', uppdateTasks);

router.delete('/:id', deleteTasks);

module.exports = router;
