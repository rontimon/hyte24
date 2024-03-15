// index.js
import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to my REST API!');
});

server.listen(port, hostname, () => {
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


