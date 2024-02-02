import { Router as createRouter } from 'express';
import { Interceptor } from '../middleware/auth.interceptor';
import { AdoptionRequestController } from '../controllers/adoption.request/adoption.request.controller';
import { AdoptionRequestRepo } from '../repository/adoption.request/adoption.request.m.repository';
import { DogRepo } from '../repository/dog/dog.m.repository';
import { DogController } from '../controllers/dog/dog.controller';

export const adoptionRequestRouter = createRouter();

const repo: AdoptionRequestRepo = new AdoptionRequestRepo();
const requestController = new AdoptionRequestController(repo);
const interceptor = new Interceptor(repo);

const repoDog: DogRepo = new DogRepo();
const dogController = new DogController(repoDog);

adoptionRequestRouter.get('/', requestController.getAll.bind(requestController));
adoptionRequestRouter.post(
  '/',
  interceptor.logged.bind(interceptor),
  requestController.addRequest.bind(requestController),
);
adoptionRequestRouter.get(
  '/shelter/:id',
  interceptor.logged.bind(interceptor),
  requestController.getAdoptionRequestByShelter.bind(requestController),
);
adoptionRequestRouter.get(
  '/user/:id',
  interceptor.logged.bind(interceptor),
  requestController.getAdoptionRequestByUser.bind(requestController),
);
adoptionRequestRouter.patch(
  '/:id',
  interceptor.logged.bind(interceptor),
  requestController.updateAdoptionRequest.bind(requestController),
  dogController.updateDogAdoptedBy.bind(dogController),
);
adoptionRequestRouter.get('/:dogId/:userId', requestController.checkDogIsAdoptionRequest.bind(requestController));
adoptionRequestRouter.delete(
  '/:id',
  interceptor.logged.bind(interceptor),
  requestController.deleteAdoptionRequest.bind(requestController),
);
