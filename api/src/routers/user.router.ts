import { Router as createRouter } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserRepo } from '../repository/user/user.m.repository';
import { Interceptor } from '../middleware/register.interceptor';

export const userRouter = createRouter();

const repo: UserRepo = new UserRepo();
const controller = new UserController(repo);
const interceptor = new Interceptor(repo);

userRouter.get('/', controller.getAll.bind(controller));
userRouter.post(
  '/register/',
  interceptor.authorizedForRegister.bind(interceptor),
  controller.register.bind(controller),
);
