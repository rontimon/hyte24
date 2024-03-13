import express from 'express';
import {body, param} from 'express-validator';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
  // Päiväkirjamerkinnät
  getUserDiaryEntries,
  postDiaryEntry,
  putDiaryEntry,
  deleteDiaryEntryController,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(
    authenticateToken,
    body('entry_date').isDate(),
    body('mood').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('weight').optional().isFloat({min: 30, max: 200}),
    body('sleep_hours').optional().isInt({min: 0, max: 24}),
    body('notes').optional().isString().isLength({min: 3, max: 300}),
    validationErrorHandler,
    postEntry,
  );

entryRouter
  .route('/:id')
  .get(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    getEntryById,
  )
  .put(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    // user_id is not allowed to be changed
    body('user_id', 'not allowed').not().exists(),
    body('entry_date').optional().isDate(),
    body('mood').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('weight').optional().isFloat({min: 30, max: 200}),
    body('sleep_hours').optional().isInt({min: 0, max: 24}),
    body('notes').optional().isString().isLength({min: 3, max: 300}),
    validationErrorHandler,
    putEntry,
  )
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteEntry,
  );


// Päiväkirjamerkinnät

entryRouter.route('/diary/:id')
    .get(authenticateToken, getUserDiaryEntries)
    .post(authenticateToken, postDiaryEntry)

    .delete(authenticateToken, deleteDiaryEntryController);

entryRouter.route('/diary/:id')
  .put(
    authenticateToken,
    param('diary_id', 'must be integer').isInt(),
    // user_id is not allowed to be changed
    body('user_id', 'not allowed').not().exists(),
    body('entry_date').optional().isDate(),
    body('mood').optional().isInt({min: 1, max: 10}),
    body('training_time').optional().isInt({min: 1, max: 500}),
    body('notes').optional().isString().isLength({min: 2, max: 300}),
    body('goals').optional().isString().isLength({min: 2, max: 300}),
    putDiaryEntry);

// entryRouter.route('/login')
//     .post(
//       '/login',
//       body('username').trim().notEmpty(),
//       body('password').trim().notEmpty(),
//       validationErrorHandler,
//       postLogin,
//     )
// entryRouter.route('/diary/:id')
//     .get(authenticateToken, getDiaryEntriesByUser);

  // entryRouter
  //   .post('/', authenticateToken, postDiaryEntry)
  //   .get('/', authenticateToken, getDiaryEntries);

export default entryRouter;
