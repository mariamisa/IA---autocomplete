const http = require('http');
const fs = require('fs');
const path = require('path');
const env = require('env2')('src/env.json');
const querystring = require('querystring');

const getDataFromApi = () => {
  http.get(`http://api.openweathermap.org/data/2.5/weather?q=gaza&appid=${process.env.api_key}`, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const newData = querystring.parse(data); // obj
      console.log(newData);
      const fb = path.join(__dirname, 'countries.json');
      fs.writeFile(fb, JSON.stringify(newData), (err) => {
        console.log(err);
      });
    });
  }).on('error', (err) => {
    console.log(`Error: ${err.message}`);
  });
};

getDataFromApi();

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end('<h1>internal server error</h1>');
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(file);
      }
    });
  } else if (path.extname(endpoint)) {
    const extention = path.extname(endpoint);
    const extensionType = {
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.ico': 'image/x-icon',
    };
    const filePath = path.join(__dirname, '..', 'public', endpoint);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end('<h1>internal server error</h1>');
      } else {
        response.writeHead(200, { 'Content-Type': extensionType[extention] });
        response.end(file);
      }
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1>page not found 404</h1>');
  }
};

const server = http.createServer(router);
const { port } = process.env;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('hello from port 4000');
});
