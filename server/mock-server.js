'use strict';

const PORT = 3000;
const FILE_PATH = `${__dirname}/db.json`;

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(FILE_PATH);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

/**
 * INIT SERVER FUNCTION
 */
(function __init() {
  server.listen(PORT, () => {
    console.log(`JSON Server is running on port: ${PORT}`);
  });
})();
