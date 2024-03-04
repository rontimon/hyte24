import express from 'express';
import { body } from 'express-validator';
import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const userRouter = express.Router();

userRouter.route('/')
  .get(authenticateToken, getUsers)
  .put(authenticateToken, [
    body('username').optional().trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body('email').optional().trim().isEmail(),
    body('password').optional().trim().isLength({ min: 8, max: 128 }),
  ], putUser)
  .post([
    body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric().withMessage('Käyttäjänimen tulee olla vähintään 3 merkin mittainen.'),
    body('password').trim().isLength({ min: 8, max: 128 }).withMessage('Salasanan tulee olla vähintään 8 merkin mittainen.'),
    body('email').trim().isEmail().withMessage('Virheellinen sähköpostiosoite.'),
  ], postUser);

userRouter.route('/:id')
  .get(authenticateToken, getUserById)
  .delete(authenticateToken, deleteUser);

export default userRouter;
