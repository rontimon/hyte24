// index.js
import express from 'express';
import path, { parse } from 'path';
import {fileURLToPath} from 'url';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// Staattinen sivusto palvelimen juureen (public-kansion sisältö näkyy osoitteessa http://127.0.0.1:3000/sivu.html)
app.use(express.static('public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Staattinen sivusto "ali-url-osoitteessa": http://127.0.0.1:3000/sivusto
// Tarjoiltava kansio määritellään relatiivisella polulla
app.use('/sivusto', express.static(path.join(__dirname, '../public')));

// mock data for simple API
const items = [
  {id: 1, name: 'Item yksi'},
  {id: 2, name: 'Item kaksi'},
  {id: 3, name: 'Item kolme'},
  {id: 4, name: 'Item neljä'},
];

// GET http://127.0.0.1:3000/items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET http://127.0.0.1:3000/items/<ID>
// app.get('/items/:id', (req, res) => {
  // TODO: palauta vain se objekti, jonka id vastaa pyydettyä
//  console.log('requested item id', req.params.id);
//  let item = 'tämän tilalle oikea objekti';
//  res.json(item);
// });

app.get('/items/:id', (req, res) => {
  console.log('Requested item id:', req.params.id);
  const requestedId = parseInt(req.params.id);

  if (isNaN(requestedId)) {
    return res.status(400).send('Invalid ID');
  }

  const item = items.find(item => item.id === requestedId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Itemin lisäys
// POST http://127.0.0.1:3000/items/
app.post('/items', (req, res) => {
  // TODO (vapaaehtonen, jatketaan tästä ens kerralla): lisää postattu item items-taulukkoon
  res.json({message: 'item created'});
});

// GET http://127.0.0.1:3000
// ei toimi tällä hetkellä, koska public-server tarjoilee index.html:n ensin
app.get('/', (req, res) => {
  res.send('Welcome to my REST api!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// const server = http.createServer((req, res) => {
//  console.log('request obj:', req.url, req.headers, req.method);
//  if (req.url === '/jotain') {
//    res.end('Hait jotain!');
//    return;
//  }
//  res.writeHead(200, {'Content-Type': 'text/html'});
//  res.end('<h1>Tervetuloa sivulle!</h1>');
// });

// server.listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
// });

