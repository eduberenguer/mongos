import { Router as createRouter } from 'express';
import { Interceptor } from '../middleware/auth.interceptor';
import { DogController } from '../controllers/dog/dog.controller';
import { DogRepo } from '../repository/dog/dog.m.repository';
import { ShelterRepo } from '../repository/shelter/shelter.m.repository';
import { UserRepo } from '../repository/user/user.m.repository';
import { AccountsController } from '../controllers/account/account.controller';

export const dogRouter = createRouter();

const repo: ShelterRepo = new ShelterRepo();
const interceptor = new Interceptor(repo);

const repoUser: UserRepo = new UserRepo();
const userController = new AccountsController(repoUser);

const repoDog: DogRepo = new DogRepo();
const dogController = new DogController(repoDog);

dogRouter.get('/', dogController.getAll.bind(dogController));
dogRouter.get('/dogByShelter/:id/:showArchivedDogs', dogController.getAllDogsByShelter.bind(dogController));
dogRouter.post(
  '/',
  interceptor.logged.bind(interceptor),
  interceptor.authorizedAddDog.bind(interceptor),
  dogController.addDog.bind(dogController),
);
dogRouter.patch('/:id', interceptor.logged.bind(interceptor), dogController.updateDog.bind(dogController));
dogRouter.delete(
  '/:id',
  interceptor.logged.bind(interceptor),
  dogController.delete.bind(dogController),
  userController.checkDogDeletedandUpdateFavorites.bind(userController),
);
dogRouter.get('/:id', dogController.getById.bind(dogController));
dogRouter.patch('/:id/views', dogController.updateDogViews.bind(dogController));
dogRouter.patch('/:id/requests', dogController.updateDogRequests.bind(dogController));
