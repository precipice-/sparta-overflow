import { Router } from 'express';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import { UsersController } from '../controllers/users.controller.js';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.put('/promote', needSignin, usersController.promote); // 매니저 승급

export { usersRouter };
