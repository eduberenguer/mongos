// ./src/router.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

const controller = new UserController('/users');

router.get('/', controller.getAll.bind(controller));

export default router;
