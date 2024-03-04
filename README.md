Hyte web dev example back-end server
Node.js + Express application.

(Check weekly branches too.)

Usage
Clone/download code
Run npm i inside project folder
Install & start MySQL/MariaDB server
Import database script(s) in db/ folder
Create .env file based on .env.sample
Start the dev server: npm run dev / npm start
Resources and endpoints
/items (works with hard-coded mock data only, no need for db)
GET http://127.0.0.1:3000/items
GET http://127.0.0.1:3000/items/:id
DELETE http://127.0.0.1:3000/items/:id

POST http://127.0.0.1:3000/items
content-type: application/json
body: {"name": "New Item"}
/api/users
Example queries:

# Get all users (requires token)
GET http://127.0.0.1:3000/api/users

# Get user by id (requires token)
GET http://127.0.0.1:3000/api/users/:id

# Delete user (requires token)
DELETE http://127.0.0.1:3000/api/users/:id

# Create user
POST http://127.0.0.1:3000/api/users
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}

# Update user's own data (requires token)
PUT http://127.0.0.1:3000/api/users/
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}

# Login
POST http://localhost:3000/api/users/login
content-type: application/json

{
  "username": "user",
  "password": "secret"
}
/api/entries
Example queries:

# Get all entries for a logged in user (requires token)
GET http://localhost:3000/api/entries

# Get entries by id
GET http://localhost:3000/api/entries/:id

# Post entry
POST http://localhost:3000/api/entries
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Happy",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day",
  "user_id": 3
}

# Update entry
PUT http://localhost:3000/api/entries/:id
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Even more happy now",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day",
  "user_id": 3
}

# Delete entry
DELETE http://localhost:3000/api/entries/:id
