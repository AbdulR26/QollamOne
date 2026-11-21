import { Router } from 'express';
import { validate } from '../../shared/middlewares/validate.js';
import { validateHealthQuery } from './health.validation.js';
import { HealthRepository } from './health.repository.js';
import { HealthService } from './health.service.js';
import { HealthController } from './health.controller.js';

const router = Router();

const healthRepository = new HealthRepository();
const healthService = new HealthService(healthRepository);
const healthController = new HealthController(healthService);

router.get('/', validate(validateHealthQuery), healthController.getHealth);

export default router;
