DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);
¨
-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Tehdään taulu yksilöprojektia varten

CREATE TABLE TrainingDiary (
    diary_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood INT CHECK (mood BETWEEN 1 AND 10),
    training_time DECIMAL(3,1),
    notes TEXT,
    goals TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tehdään taulu HEALTHMETRICS terveystulosten kirjaamiseen

CREATE TABLE HealthMetrics (
    metric_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    measurement_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    blood_pressure_systolic INT,
    blood_pressure_diastolic INT,
    heart_rate INT,
    blood_sugar DECIMAL(5,2),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tehdään taulu MEDICATIONINTAKE lääkkeiden käytön kirjaamiseen
CREATE TABLE MedicationIntake (
    intake_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    intake_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    medication_name VARCHAR(100),
    dosage VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);



-- INSERT User sample data
-- Iserting multiple user rows at once
INSERT INTO Users (username, password, email, user_level) VALUES
  ('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');


-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2023-12-10 21:00:00');

--   Lisätään mittaustietoja HEALTHMETRICS tauluun
INSERT INTO HealthMetrics (user_id, measurement_date, blood_pressure_systolic, blood_pressure_diastolic, heart_rate, blood_sugar) VALUES
    (1, '2024-01-10', 120, 80, 70, 5.4),
    (1, '2024-01-11', 118, 79, 72, 5.5),
    (2, '2024-01-10', 122, 82, 75, 5.3);

    -- Lisätään lääkintätietoja MedicationIntake taluun

    INSERT INTO MedicationInTake (user_id, intake_date, medication_name, dosage) VALUES
(1, '2024-01-10', 'Aspirin', '100mg'),
(1, '2024-01-11', 'Vitamin D', '5000 IU'),
(2, '2024-01-10', 'Ibuprofen', '200mg');




-- Example queries
SELECT Users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
  FROM Users, DiaryEntries
  WHERE DiaryEntries.user_id = Users.user_id;

-- Same with JOIN
SELECT Users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
  FROM Users JOIN DiaryEntries ON DiaryEntries.user_id = Users.user_id;

-- Entries for specific username
SELECT entry_date, mood, sleep_hours FROM DiaryEntries
  JOIN Users ON DiaryEntries.user_id = Users.user_id
  WHERE username = 'johndoe';
