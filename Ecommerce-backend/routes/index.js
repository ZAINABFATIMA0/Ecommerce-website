import express from 'express';

import auth from './auth';
import productroutes from './productRoute'
const router = express.Router();

router.use('/auth', auth);
router.use('/product',productroutes)

export default router;
