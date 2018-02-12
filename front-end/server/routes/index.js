const userController = require('../controllers').userController;
const employerController = require('../controllers').employerController;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/login/logcheck', userController.loadOnLogin);
  app.post('/api/register', userController.create);
  app.post('/api/user/addEmployer', userController.addEmployer);
  app.post('/api/listEmployer', employerController.getJobs);
  app.get('/api/user/list', userController.list);

  app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
