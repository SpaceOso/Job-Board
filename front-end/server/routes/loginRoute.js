const express = require('express');
const router = express.Router();

let jwt = require('jsonwebtoken');
const userController = require('../controllers').userController;


/*Working on getting loginRoutes from .routes/loginRoutes here*/
/*need to fix this so when we create an employer and we do the log check
* it will come back positive*/
router.post('/logcheck', userController.loadOnLogin);
router.post('/', userController.login);

module.exports = router;