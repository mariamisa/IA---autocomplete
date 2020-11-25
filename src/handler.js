const path = require('path');
const fs = require('fs');

const { city } = require('./cuntres');
const search = require('../utils/logic');

const handelHome = (response) => {
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
};

const handelPublic = (response, endpoint) => {
  const extension = path.extname(endpoint);
  const extensionType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
  };
  const filePath = path.join(__dirname, '..', 'public', endpoint);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1>internal server error</h1>');
    } else {
      response.writeHead(200, { 'Content-Type': extensionType[extension] });
      response.end(file);
    }
  });
};

const handelSearch = (request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    const world = JSON.parse(data);
    const autocompleteResult = search(city, world);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(autocompleteResult.slice(0, 20)));
  });
  request.on('error', (err) => {
    response.end(`Error: ${err.message}`);
  });
};

const handelError = (response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end('page not found 404');
};
module.exports = {
  handelHome, handelPublic, handelSearch, handelError,
};
