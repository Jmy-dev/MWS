import express from 'express';
import { create, getMyPatches, getPatchById } from './controllers/patch.controller.js';
import { protect } from '../../common/middleware/auth.js';

const router = express.Router();

router.post('/', protect, create);
router.get('/my-patches', protect, getMyPatches);
router.get('/:id', protect, getPatchById);

export default router;