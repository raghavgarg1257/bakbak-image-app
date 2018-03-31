import express from 'express';

import RootController from '../../app/controllers/RootController';
import middlewares from '../../app/utils/middlewares';

const router = express.Router();

router.all(middlewares.controllerBase);
router.get('/', RootController.all);

export default router;
