const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
// const env = require('env2')('src/env.json');
const { getDataFromApi } = require('./data');
const { apiData } = require('./countries');

// getDataFromApi();

const router = (request, response) => {
  const endpoint = request.url;
  const requestMethod = request.method;
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
        response.writeHead(200, { 'Content-Type': extensionType[extention] });
        response.end(file);
      }
    });
  } else if (endpoint === '/search-countries' && requestMethod === 'POST') {
    let data = '';

    request.on('data', (chunk) => {
      data += chunk;
    });
    request.on('end', () => {
      const newData = querystring.parse(data);
      const city = newData;
      const letter = city.post.slice(0, 1).toUpperCase();
      const autocompleteResult = apiData.filter((item) => item.name.slice(0, 1) === letter);
      console.log(autocompleteResult);

      // console.log(newData.list.length);
      // const filteredData = newData.list.map((el) => ({
      //   name: el.name,
      //   weather: el.weather,
      // }));
      // console.log(filteredData);
      // const fb = path.join(__dirname, );
      // fs.writeFile(fb, JSON.stringify(filteredData), (err) => {
      //   console.log(err);
      // });
    });
    request.on('error', (err) => {
      console.log(`Error: ${err.message}`);
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1>page not found 404</h1>');
  }
};

const server = http.createServer(router);
const port = process.env.PORT || 4000;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('hello from port 4000');
});
module.exports = { http, fs, path };
