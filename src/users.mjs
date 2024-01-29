const users = [
  {
    id: 1,
    username: "johndoe",
    password: "password1",
    email: "johndoe@example.com",
  },
  {
    id: 2,
    username: "janedoe",
    password: "password2",
    email: "janedoe@example.com",
  },
  {
    id: 3,
    username: "bobsmith",
    password: "password3",
    email: "bobsmith@example.com",
  },
];

// TODO: implement route handlers below for users

const getUsers = (req, res) => {
  res.json(users);
};

// Hakee Idllä henkilön tiedot    //tehty
const getUserById = (req, res) => {
  // TODO: implement this
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user); //käyttäjä löytyi ja lähetetään tiedot json muodossa
  } else {
    res.status(404).send('Käyttäjää ei löytynyt');
  }
  // res.send('not working yet');
};

// Lisää uuden käyttäjän
const postUser = (req, res) => {
  const newUser = req.body;
  if (!newUser.username || !newUser.password || !newUser.email) {
    return res.status(400).send('Tietoja puuttuu');
  }
  // Luodaan käyttäjä ja määritetään sille uusi ID
  const userId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const userToAdd = {id: userId, ...newUser};
  // Lisää käyttäjän taulukkoon
  users.push(userToAdd);

  res.status(201).json(userToAdd);
  // TODO: implement this
  // res.send('not working yet');
};

// Muokkaa olemassa olevaa käyttäjää
const putUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  // tarkistetaan, löytyikö käyttäjä annetulla Id:llä
  if (userIndex === -1) {
    return res.status(404).send('Käyttäjää ei löytynyt');
  }

  const updateUser = req.body;
  if (!updateUser.username || !updateUser.password || !updateUser.email) {
    return res.status(400).send('Tietoja puuttuu');
  }

  // päivitetään käyttäjän tiedot

  users[userIndex] = { id: userId, ...updateUser };
  res.json(users[userIndex]);

  // TODO: implement this
};

// Dummy login, returns user object if username & password match
const postLogin = (req, res) => {
  const userCreds = req.body;
  if (!userCreds.username || !userCreds.password) {
    return res.sendStatus(400);
  }
  const userFound = users.find(user => user.username == userCreds.username);
  // user not found
  if (!userFound) {
    return res.status(403).json({error: 'username/password invalid'});
  }
  // check if posted password matches to user found password
  if (userFound.password === userCreds.password) {
    res.json({message: 'logged in successfully', user: userFound});
  } else {
    return res.status(403).json({error: 'username/password invalid'});
  }
};

export {getUsers, getUserById, postUser, putUser, postLogin};
