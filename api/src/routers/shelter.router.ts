import { Router as createRouter } from 'express';
import { ShelterController } from '../controllers/shelter.controller';
import { ShelterRepo } from '../repository/shelter/shelter.m.repository';
import { Interceptor } from '../middleware/register.interceptor';

export const shelterRouter = createRouter();

const repo: ShelterRepo = new ShelterRepo();
const controller = new ShelterController(repo);
const interceptor = new Interceptor(repo);

shelterRouter.get('/', controller.getAll.bind(controller));
shelterRouter.post(
  '/register',
  interceptor.authorizedForRegister.bind(interceptor),
  controller.register.bind(controller),
);
