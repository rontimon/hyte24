import {customError} from '../middlewares/error-handler.mjs';
import {
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesByUserId,
  addDiaryEntry,
  getDiaryEntriesByUserId,
  updateDiaryEntry,
  deleteDiaryEntry,
} from '../models/entry-model.mjs';

const getEntries = async (req, res, next) => {
  // return only logged in user's own entries
  // - get user's id from token (req.user.user_id)
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    next(new Error(result.error));
  }
};

const getEntryById = async (req, res, next) => {
  const entry = await findEntryById(req.params.id, req.user.user_id);
  if (entry) {
    res.json(entry);
  } else {
    next(customError('Entry not found', 404));
  }
};

const postEntry = async (req, res, next) => {
  const userId = req.user.user_id;
  const result = await addEntry(req.body, userId);
  if (result.entry_id) {
    res.status(201);
    res.json({message: 'New entry added.', ...result});
  } else {
    next(new Error(result.error));
  }
};

const putEntry = async (req, res, next) => {
  const entryId = req.params.id;
  const userId = req.user.user_id;
  const result = await updateEntryById(entryId, userId, req.body);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.status(201).json(result);
};

const deleteEntry = async (req, res, next) => {
  const result = await deleteEntryById(req.params.id, req.user.user_id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};





// Päiväkirjamerkinnät


// Lisää päiväkirjamerkinnän
const postDiaryEntry = async (req, res, next) => {
  try {
    const result = await addDiaryEntry(req.body);
    res.status(201).json({ message: 'Diary entry added succesfully.', result });
  } catch (error) {
    next(error);
  }
};

// Hakee käyttäjän päiväkirjamerkinnät

const getUserDiaryEntries = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const entries = await getDiaryEntriesByUserId(userId);
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

// Päivittää päiväkirjamerkinnän

const putDiaryEntry = async (req, res, next) => {
  try {
    const entryId = req.params.id;
    const result = await updateDiaryEntry(entryId, req.body);
    res.json({ message: 'Diary entry updated successfully', result });
  } catch (error) {
    next(error);
  }
};

// poistaa päiväkirjamerkinnän

const deleteDiaryEntryController = async (req, res, next) => {
  try {
    const entryId = req.params.id;
    const result = await deleteDiaryEntry(entryId);
    res.json({ message: 'Diary entry deleted successfully', result });
  } catch (error) {
    next(error);
  }
};





export {getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
  // päiväkirjamerkinnät
  postDiaryEntry,
  getUserDiaryEntries,
  putDiaryEntry,
  deleteDiaryEntryController,
  };

// Uuden päiväkirjamerkinnän luominen

// haetaan päiväkirjamerkinnät:

// const getDiaryEntriesByUser = async (req, res) => {
//   const userId = req.user.user_id;

//   try {
//     const entries = await listAllDiaryEntriesByUserId(userId);
//     return res.json(entries);
//   } catch (error) {
//     console.error('getExerciseEntriesByUser error:', error);
//     return res.status(500).json({error: 'Database error'});
//   }
// };

// const postDiaryEntry = async (req, res, next) => {
//   try {
//     // Oletetaan, että req.body sisältää tarvittavat tiedot
//     const newEntry = await addEntry(req.body);
//     res.status(201).json(newEntry);
//   } catch (error) {
//     next(error);
//   }
// };

// // Haetaan päiväkirjamerkintä

// const getDiaryEntries = async (req, res, next) => {
//   try {
//     const userId = req.user.user_id; // Oletetaan, että käyttäjän id on saatavilla req.userista
//     const entries = await listAllEntriesByUserId(userId);
//     res.json(entries);
//   } catch (error) {
//     next(error);
//   }
// };




