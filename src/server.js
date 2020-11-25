const http = require('http');
const router = require('./router')
require('env2')('./.env');


const server = http.createServer(router);
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`hello from PORT ${PORT}`);
});
