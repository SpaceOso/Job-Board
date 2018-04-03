const express = require('express');
const router = express.Router();
//controllers
const userController = require('../controllers').userController;
const upload = require('../controllers/uploadController');


router.post('/company', upload.single('file'), userController.addCompany);
router.post('/', userController.create);

module.exports = router;