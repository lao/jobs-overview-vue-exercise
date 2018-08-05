'use strict';

const PORT = 3000;
const DOMAIN = 'localhost';
const FILE_PATH = `${__dirname}/db.json`;

const uuidv4 = require('uuid/v4');
const jsonServer = require('json-server');
const setCookie = require('set-cookie');
const server = jsonServer.create();
const router = jsonServer.router(FILE_PATH);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  setCookie('user_id', uuidv4(), {
    domain: `${DOMAIN}`,
    res: res
  });
  next();
});
server.use(router);

/**
 * INIT SERVER FUNCTION
 */
(function __init() {
  server.listen(PORT, () => {
    console.log(`JSON Server is running on port: ${PORT}`);
  });
})();
