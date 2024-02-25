/* eslint-disable max-len */
/* eslint-disable new-cap */
import express from 'express';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { authenticateTokenAndAuthorize } from '../middlewares/authentication.mjs';

const entryRouter = express.Router();

entryRouter.route('/').get(authenticateToken, getEntries).post(postEntry);

entryRouter.route('/:id').get(getEntryById).put(putEntry).delete(deleteEntry);

entryRouter.route('/admin/entries')
    .get(authenticateTokenAndAuthorize(['admin']), getEntries) // Vain admin-käyttäjät
    .post(authenticateTokenAndAuthorize(['admin', 'editor']), postEntry); // Adminit ja editorit

export default entryRouter;
