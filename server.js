// server.js
const express = require('express');
const next = require('next');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(helmet());

  server.get('/get-list', (req, res) => {

  });

  server.get('*', (req, res) => handle(req, res));
});
