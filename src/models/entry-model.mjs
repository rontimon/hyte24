/* eslint-disable max-len */
/* eslint-disable camelcase */
// temporal mock data for testing, should be replaced with real data from DB
// const diaryEntries = [
//   {
//     'entry_id': 5,
//     'user_id': 5,
//     'entry_date': '2024-01-14',
//     'mood': 'Relaxed',
//     'weight': 75.0,
//     'sleep_hours': 8,
//     'notes': 'Spent the day reading',
//     'created_at': '2024-01-14T19:00:00'
//   },
//   {
//     'entry_id': 4,
//     'user_id': 4,
//     'entry_date': '2024-01-13',
//     'mood': 'Energetic',
//     'weight': 55.0,
//     'sleep_hours': 9,
//     'notes': 'Went for a morning run',
//     'created_at': '2024-01-13T18:00:00'
//   },
//   {
//     'entry_id': 3,
//     'user_id': 3,
//     'entry_date': '2024-01-12',
//     'mood': 'Tired',
//     'weight': 68.0,
//     'sleep_hours': 6,
//     'notes': 'Work was demanding',
//     'created_at': '2024-01-12T22:00:00'
//   },
//   {
//     'entry_id': 2,
//     'user_id': 2,
//     'entry_date': '2024-01-11',
//     'mood': 'Satisfied',
//     'weight': 65.0,
//     'sleep_hours': 7,
//     'notes': 'Met with friends, had a good time',
//     'created_at': '2024-01-11T21:00:00'
//   },
//   {
//     'entry_id': 1,
//     'user_id': 1,
//     'entry_date': '2024-01-10',
//     'mood': 'Happy',
//     'weight': 70.5,
//     'sleep_hours': 8,
//     'notes': 'Had a great workout session',
//     'created_at': '2024-01-10T20:00:00'
//   }
// ];

import promisePool from "../utils/database.mjs";

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('listAllEntries', error);
    return {error: 500, message: 'db error'};
  }
};

const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries WHERE entry_id = ?', [id]);
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('findEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

const addEntry = async (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  try {
    const rows = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('addEntry', error);
    return {error: 500, message: 'db error'};
  }ssage
};

const updateEntry = async (entry) => {
  try {
    const sql = 'UPDATE DiaryEntries SET username=?, password=?, email=?, WHERE entry_id';
    const params = [entry.username, entry.password, entry.email, entry.entry_id];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    return {message: 'entry data updated', entry_id: entry.entry_id};
  } catch (error) {
    console.log('updateEntry', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteUserById = async (entry) => {
  try {
    const sql = 'DELETE FROM DiaryEntries WHERE entry_id=?';
    const params = [entry];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'entry not found'};
    }
    return {message: 'entry deleted', entry_id: id};
  } catch (error) {
    console.log('deleteEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

export {listAllEntries, findEntryById, addEntry, updateEntry, deleteUserById};
