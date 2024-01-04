import { Router as createRouter } from 'express';
import { Interceptor } from '../middleware/auth.interceptor';
import { DogController } from '../controllers/dog.controller';
import { DogRepo } from '../repository/dog/dog.m.repository';
import { ShelterRepo } from '../repository/shelter/shelter.m.repository';
import { AccountsController } from '../controllers/account.controller';

export const dogRouter = createRouter();

const repo: ShelterRepo = new ShelterRepo();
const interceptor = new Interceptor(repo);
const accountController = new AccountsController(repo);

const repoDog: DogRepo = new DogRepo();
const dogController = new DogController(repoDog);

dogRouter.get('/', accountController.getAll.bind(accountController));
dogRouter.post('/', interceptor.logged, interceptor.authorizedAddDog, dogController.addDog.bind(dogController));
