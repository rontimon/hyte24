import { param } from 'express-validator';
import promisePool from '../utils/database.mjs';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const listAllEntriesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM DiaryEntries WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id, userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE entry_id = ? AND user_id = ?',
      [id, userId],
    );
    // console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (entry, userId) => {
  const sql = `INSERT INTO DiaryEntries
               (user_id, entry_date, mood, weight, sleep_hours, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    userId,
    entry.entry_date,
    entry.mood,
    entry.weight,
    entry.sleep_hours,
    entry.notes,
  ];
  try {
    const rows = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateEntryById = async (entryId, userId, entryData) => {
  try {
    const params = [entryData, entryId, userId];
    // format() function is used to include only the fields that exists
    // in the entryData object to the SQL query
    const sql = promisePool.format(
      `UPDATE DiaryEntries SET ?
       WHERE entry_id=? AND user_id=?`,
      params,
    );
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Entry not found'};
    }
    return {message: 'Entry data updated', entry_id: entryId};
  } catch (error) {
    // fix error handling
    // now duplicate entry error is generic 500 error, should be fixed to 400 ?
    console.error('updateEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteEntryById = async (id, userId) => {
  try {
    const sql = 'DELETE FROM DiaryEntries WHERE entry_id=? AND user_id=?';
    const params = [id, userId];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Entry not found'};
    }
    return {message: 'Entry deleted', entry_id: id};
  } catch (error) {
    console.error('deleteEntryById', error);
    return {error: 500, message: 'db error'};
  }
};


// Lisätään funktiot jotka suorittavat päiväkirjaSQL kyselyt


// Lisää päiväkirjamerkinnän:

const addDiaryEntry = async (entry) => {
  const sql = `INSERT INTO TrainingDiary (user_id, entry_date, mood, training_time, notes, goals) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [entry.user_id, entry.entry_date, entry.mood, entry.training_time, entry.notes, entry.goals];
  const [rows] = await promisePool.execute(sql, params);
  return rows;
};

// Hakee päiväkirjamerkinnän UserId:n perusteella

const getDiaryEntriesByUserId = async (userId) => {
  const sql = `SELECT * FROM TrainingDiary WHERE user_id = ?`;
  const [rows] = await promisePool.query(sql, [userId]);
  return rows;
};

// Päivittää päiväkirjamerkinnät

// const updateDiaryEntry = async (entryId, entry) => {
//   const sql = `UPDATE TrainingDiary SET entry_date = ?, mood = ?, training_time = ?, notes = ?, goals = ? WHERE diary_id = ?`;
//   const params = [entry.entry_date, entry.mood, entry.training_time, entry.notes, entry.goals, entryId];
//   const [result] = await promisePool.query(sql, params);
//   return result;
// };

const updateDiaryEntry = async (entryId, userId, entryData) => {
  console.log(entryData);
  const fieldsToUpdate = Object.keys(entryData).map(key => `${key}=?`).join(', ');
  const values = [...Object.values(entryData), entryId, userId];
  const sql = `UPDATE TrainingDiary SET ${fieldsToUpdate} WHERE diary_id = ? AND user_id = ?`;

  try {
    const [result] = await promisePool.query(sql, values);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Entry not found or no permission to edit'};
    }
    return {message: 'Entry updated successfully', diary_id: entryId};
  } catch (error) {
    console.error('Error updating entry:', error);
    return {error: 500, message: 'Database error during entry update'};
  }
};

// const updateDiaryEntry = async (entry) => {
//   const {diary_id, entry_date, mood, training_time, notes, goals} = entry;
//   try {
//     const sql =
//       'UPDATE TrainingDiary SET entry_date=?, mood=?, training_time=?, notes=?, goals=? WHERE diary_id=?';
//     const params = [entry_date, mood, training_time, notes, goals, diary_id];
//     const [result] = await promisePool.query(sql, params);
//     // console.log(result);
//     if (result.affectedRows === 0) {
//       return {error: 404, message: 'entry not found'};
//     }
//     return {message: 'Exercise data updated', diary_id};
//   } catch (error) {
//     // fix error handling
//     // now duplicate entry error is generic 500 error, should be fixed to 400 ?
//     console.error('updateDiaryEntry', error);
//     return {error: 500, message: 'db error'};
//   }
// };

// const updateDiaryEntry = async (entry) => {
//   const sql = `UPDATE TrainingDiary SET (entry_date, mood, training_time, notes, goals) VALUES (?, ?, ?, ?, ?, ?)`;
//   const params = [entry.entry_date, entry.mood, entry.training_time, entry.notes, entry.goals];
//   const [rows] = await promisePool.execute(sql, params);
//   return rows;
// };

// esimerkki
// const updateDiaryEntry = async (entryId, entryData) => {
//   const { entry_date, mood, training_time, notes, goals } = entryData;
//   const sql = `
//     UPDATE TrainingDiary
//     SET entry_date = ?, mood = ?, training_time = ?, notes = ?, goals = ?
//     WHERE diary_id = ?`;
//   const params = [entry_date, mood, training_time, notes, goals, entryId];
//   await promisePool.execute(sql, params);
//   return { entryId, ...entryData };
// };

// Poistaa päiväkirjamerkinnät

const deleteDiaryEntry = async (entryId) => {
  const sql = `DELETE FROM TrainingDiary WHERE diary_id = ?`;
  const [result] = await promisePool.query(sql, [entryId]);
  return result;
};



export {
  listAllEntries,
  listAllEntriesByUserId,
  findEntryById,
  addEntry,
  updateEntryById,
  deleteEntryById,
  // Päiväkirjamerkinnät
  addDiaryEntry,
  getDiaryEntriesByUserId,
  updateDiaryEntry,
  deleteDiaryEntry,
};

//








// // Uuden päiväkirjamerkinnän lisääminen
// const addDiaryEntry = async (entry, userId) => {
//   const { entry_date, mood, training_time, notes, goals } = entry;
//   try {
//     const [rows] = await promisePool.execute(
//       `INSERT INTO TrainingDiary (user_id, entry_date, mood, training_time, notes, goals) VALUES (?, ?, ?, ?, ?, ?)`,
//       [userId, entry_date, mood, training_time, notes, goals]
//     );
//     return { diary_id: rows.insertId };
//   } catch (error) {
//     console.error('addEntry error:', error.message);
//     throw error;
//   }
// };

// // Käyttäjän päiväkirjamerkinnän hakeminen

// const listAllDiaryEntriesByUserId = async (userId) => {
//   try {
//     const [rows] = await promisePool.execute(
//       `SELECT * FROM TrainingDiary WHERE user_id = ?`,
//       [userId]
//     );
//     return rows;
//   } catch (error) {
//     console.error('listAllEntriesByUserId error:', error.message);
//     throw error;
//   }
// };


