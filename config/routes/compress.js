import express from 'express';

import ImageController from '../../app/controllers/ImageController';
import middlewares from '../../app/utils/middlewares';

const router = express.Router();

router.all(middlewares.controllerBase);

router.post('/', ImageController.compress);

export default router;
