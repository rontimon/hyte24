// src/controllers/training-diary-controller.mjs

// // Ensimmäinen versio
// import { addTrainingDiaryEntry } from '../models/training-diary-model.mjs';

// const postTrainingDiaryEntry = async (req, res, next) => {
//   try {
//     const userId = req.user.user_id; // Oletus: käyttäjän tunnistus tehdään tokenista
//     const { entry_date, mood, training_time, notes, goals } = req.body;
//     const result = await addTrainingDiaryEntry({ userId, entry_date, mood, training_time, notes, goals });
//     res.status(201).json({ message: 'Training diary entry added successfully', ...result });
//   } catch (error) {
//     next(error);
//   }
// };

// // Lisää tarvittaessa muita handler-funktioita

// export { postTrainingDiaryEntry };

// Toinen versio

// src/controllers/training-diary-controller.mjs
import { addTrainingDiaryEntry } from '../models/training-diary-model.mjs';

const postTrainingDiaryEntry = async (req, res, next) => {
  try {
    // Oletus: käyttäjän tunnistus tehdään tokenista
    // Tarkista että req.user on määritelty ja sisältää user_id:n
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing' });
    }
    const userId = req.user.user_id;
    const { entry_date, mood, training_time, notes, goals } = req.body;

    // Lisää tarvittaessa syötteen validointia tässä...

    const result = await addTrainingDiaryEntry({ userId, entry_date, mood, training_time, notes, goals });
    res.status(201).json({ message: 'Training diary entry added successfully', ...result });
  } catch (error) {
    console.error('Error adding training diary entry:', error);
    next(error);
  }
};

export { postTrainingDiaryEntry };
