const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const getDataFromApi = () => {
  http.get(`http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=${process.env.API_KEY}`, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const newData = JSON.parse(data);
      const filteredData = newData.list.map((el) => ({
        name: el.name,
        weather: el.weather,
      }));
      console.log(filteredData);
      const fb = path.join(__dirname, 'countries.js');
      fs.writeFile(fb, JSON.stringify(filteredData), (err) => {
        console.log(err);
      });
    });
  }).on('error', (err) => {
    console.log(`Error: ${err.message}`);
  });
};

module.exports = { getDataFromApi };
