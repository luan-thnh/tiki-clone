const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

function router(req) {
  // Customer
  if (req.url === '/') return './site-customer/pages/index.html';
  if (req.url === '/register') return './site-customer/pages/register/index.html';
  if (req.url === '/login') return './site-customer/pages/login/index.html';
  if (req.url === '/details') return './site-customer/pages/details/index.html';
  if (req.url === '/cart') return './site-customer/pages/cart/index.html';
  if (req.url === '/search') return './site-customer/pages/search/index.html';

  // Admin
  if (req.url === '/admin') return './site-admin/pages/index.html';
  if (req.url === '/admin/users') return './site-admin/pages/users/index.html';
  if (req.url === '/admin/login') return './site-admin/pages/login/index.html';

  return req.url;
}

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'src', router(req));

  let extName = path.extname(filePath);
  let contentType = 'text/html';

  switch (extName) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }
  try {
    res.writeHead(200, { 'Content-Type': contentType });
    const readStream = fs.createReadStream(filePath);
    // Handling error event
    readStream.on('error', (err) => {
      console.log(err);
    });
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
});

server.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Server listening at port ${port}...`);
    console.log(`Access :  Http://localhost:3000`);
  }
});
