/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).send({message: 'invalid token'});
  }
};

// Lisätty funktio roolipohjaiseen valtuutukseen
const authenticateTokenAndAuthorize = roles => (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden, jos token on virheellinen

    if (!roles.includes(decoded.role)) {
      // Jos käyttäjän rooli ei vastaa vaadittua roolia
      return res.sendStatus(403); // Forbidden, jos käyttäjällä ei ole oikeaa roolia
    }

    req.user = decoded; // Tallentaa dekoodatun käyttäjätiedon pyyntöobjektiin
    next(); // Jatkaa seuraavaan middlewareen tai reittikäsittelijään
  });
};

export {authenticateToken, authenticateTokenAndAuthorize};
