// src/models/training-diary-model.mjs
import promisePool from '../utils/database.mjs';

const addTrainingDiaryEntry = async ({ userId, entry_date, mood, training_time, notes, goals }) => {
  const sql = `INSERT INTO TrainingDiary (user_id, entry_date, mood, training_time, notes, goals) VALUES (?, ?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [userId, entry_date, mood, training_time, notes, goals]);
  return { diary_id: result.insertId };
};

// Lisää tarvittaessa muita funktioita, kuten haku, päivitys, poisto...

export { addTrainingDiaryEntry };
