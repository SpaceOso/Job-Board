const userController = require('../controllers').userController;
const companyController = require('../controllers').companyController;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/login/logcheck', userController.loadOnLogin);
  app.post('/api/register', userController.create);
  app.post('/api/employee/addCompany', userController.addCompany);
  app.post('/api/listCompany', companyController.getJobs);
  app.get('/api/employee/list', userController.list);

  app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
