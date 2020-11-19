const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const env = require("env2")("./.env");
const { getDataFromApi } = require("./data");
const { city } = require("./cuntres");
const {handelHome} = require("./handler");

getDataFromApi();

const router = (request, response) => {
  const endpoint = request.url;
  const requestMethod = request.method;
  if (endpoint === "/") {
    handelHome(response)
  }
 
  else if (path.extname(endpoint)) {
    const extension = path.extname(endpoint);
    const extensionType = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".json": "application/json",
      ".ico": "image/x-icon",
      ".png": "image/png",
      ".jpg": "image/jpg",
    };
    const filePath = path.join(__dirname, "..", "public", endpoint);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end("<h1>internal server error</h1>");
      } else {
        response.writeHead(200, { "Content-Type": extensionType[extension] });
        response.end(file);
      }
    });
  } else if (endpoint === "/search-countries" && requestMethod === "POST") {
    let data = "";

    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const newData = querystring.parse(data);
      const cityA = newData;
      const letter = cityA.post.slice(0, 1).toUpperCase();
     
      const autocompleteResult = city.filter(
        (item) => item.startWith(letter)).slice(20)
        console.log(autocompleteResult);
        

      response.writeHead(302,{Location:"/"})
      response.end(autocompleteResult)
      
        });
    request.on("error", (err) => {
      console.log(`Error: ${err.message}`);
    });
  
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("<h1>page not found 404</h1>");
  }
};

const server = http.createServer(router);
const port = process.env.PORT || 4000;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("hello from port 4000");
});
module.exports = { http, fs, path };
