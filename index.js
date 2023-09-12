const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = './';

  // Determine the file path based on the URL
  if (req.url === '/') {
    filePath += 'index.html';
  } else if (req.url === '/about') {
    filePath += 'about.html';
  } else if (req.url === '/contact-me') {
    filePath += 'contact-me.html';
  } else {
    filePath += '404.html';
  }

  // Read the file and serve it
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
    } else {
      // Determine the content type based on the file extension
      const extname = path.extname(filePath);
      let contentType = 'text/html';

      switch (extname) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
