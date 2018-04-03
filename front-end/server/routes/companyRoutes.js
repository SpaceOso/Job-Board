const express = require('express');
const newArr = [];
router = express.Router();

const companyController = require('../controllers').companyController;

router.post('/createJob', companyController.createJob);
router.get('/:companyId/get-jobs', companyController.getJobs);
router.post('/update/:applicantId', companyController.updateApplicantStatus);

module.exports = router;