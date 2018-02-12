const express = require('express');
const newArr = [];
router = express.Router();

const employerController = require('../controllers').employerController;

router.post('/createJob', employerController.createJob);
router.get('/:employerId/get-jobs', employerController.getJobs);
router.post('/update/:applicantId', employerController.updateApplicantStatus);

module.exports = router;