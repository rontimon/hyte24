// src/routes/training-diary-router.mjs
import express from 'express';
import { postTrainingDiaryEntry } from '../controllers/training-diary-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const router = express.Router();

router.post('/', authenticateToken, postTrainingDiaryEntry);

// Määrittele tarvittaessa lisää reittejä

export default router;
