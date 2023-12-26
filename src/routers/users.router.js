import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/promote', usersController.promote); // 회원가입

export { usersRouter };
