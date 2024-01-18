import { Router as createRouter } from 'express';
import { AccountsController } from '../controllers/account.controller';
import { ShelterRepo } from '../repository/shelter/shelter.m.repository';
import { Interceptor } from '../middleware/auth.interceptor';

export const shelterRouter = createRouter();

const repo: ShelterRepo = new ShelterRepo();
const accountController = new AccountsController(repo);
const interceptor = new Interceptor(repo);

shelterRouter.get('/', accountController.getAll.bind(accountController));
shelterRouter.post(
  '/register',
  interceptor.authorizedForRegister.bind(interceptor),
  accountController.register.bind(accountController),
);
shelterRouter.post('/login/', accountController.login.bind(accountController));
shelterRouter.get('/:id', accountController.getById.bind(accountController));
