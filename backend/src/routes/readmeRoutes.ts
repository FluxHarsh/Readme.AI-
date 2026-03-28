import express from 'express';
import { generate } from '../controllers/readmeController.js';

const router = express.Router();

router.post('/generate', generate)

export default router;
