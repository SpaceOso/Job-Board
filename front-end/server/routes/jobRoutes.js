const express = require('express');
const router = express.Router();

const jobController = require('../controllers').jobsController;

router.get('/:jobId', jobController.getById);
router.get('/', jobController.list);

module.exports = router;