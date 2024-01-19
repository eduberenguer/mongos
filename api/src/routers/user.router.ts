import { Router as createRouter } from 'express';
import { AccountsController } from '../controllers/account.controller';
import { UserRepo } from '../repository/user/user.m.repository';
import { Interceptor } from '../middleware/auth.interceptor';

export const userRouter = createRouter();

const repo: UserRepo = new UserRepo();
const accountController = new AccountsController(repo);
const interceptor = new Interceptor(repo);

userRouter.get('/', accountController.getAll.bind(accountController));
userRouter.post(
  '/register/',
  interceptor.authorizedForRegister.bind(interceptor),
  accountController.register.bind(accountController),
);
userRouter.post('/login/', accountController.login.bind(accountController));
userRouter.patch(
  '/login/',
  interceptor.authorization.bind(interceptor),
  accountController.login.bind(accountController),
);
