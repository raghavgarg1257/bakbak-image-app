import express from 'express';

import middlewares from '../../app/utils/middlewares';
import _root from './root';
import _compress from './compress';

const router = express.Router();

router.use(middlewares.applicationBase);
router.use('/', _root);
router.use('/compress', _compress);

export default router;
