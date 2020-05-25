import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CategoryController from './app/controllers/CategoryController';
import TodoController from './app/controllers/TodoController';
import ReminderController from './app/controllers/ReminderController';
import FileController from './app/controllers/FileController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateCategoryStore from './app/validators/CategoryStore';
import validateTodoStore from './app/validators/TodoStore';
import validateReminderStore from './app/validators/ReminderStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.json({ message: 'Listening...' });
});

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/categories', CategoryController.index);
routes.post('/categories', validateCategoryStore, CategoryController.store);

routes.get('/todos', TodoController.index);
routes.post('/todos', validateTodoStore, TodoController.store);
// routes.put('/todos/:id', TodoController.update);

routes.post('/todos/:todo_id/create/reminder', validateReminderStore, ReminderController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
