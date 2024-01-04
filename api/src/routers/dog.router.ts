import { Router as createRouter } from 'express';
import { Interceptor } from '../middleware/auth.interceptor';
import { DogController } from '../controllers/dog.controller';
import { DogRepo } from '../repository/dog/dog.m.repository';
import { ShelterRepo } from '../repository/shelter/shelter.m.repository';

export const dogRouter = createRouter();

const repo: ShelterRepo = new ShelterRepo();
const interceptor = new Interceptor(repo);

const repoDog: DogRepo = new DogRepo();
const dogController = new DogController(repoDog);

dogRouter.get('/', dogController.getAll.bind(dogController));
dogRouter.post('/', interceptor.logged, interceptor.authorizedAddDog, dogController.addDog.bind(dogController));
