const express = require('express');
const router = express.Router();
//controllers
const userController = require('../controllers').userController;
const upload = require('../controllers/uploadController');


router.post('/employer', upload.single('file'), userController.addEmployer);
router.post('/', userController.create);

module.exports = router;