const express = require('express');
const router = express.Router();
const applicantController = require('../controllers').applicantController;
const upload = require('../controllers/uploadController');

router.post('/', upload.fields([{name: 'resume', maxCount: 1}, {name: 'coverLetter', maxCount: 1}]), applicantController.create);

module.exports = router;