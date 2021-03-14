const jsonServer = require('json-server');
const express = require('express');
const path = require('path');
const routes = require('./routes/routes.json');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './db/db.json'));
const middlewares = jsonServer.defaults();
server.use('/static', express.static(path.join(__dirname, 'public')));

server.use(middlewares);
server.use(jsonServer.rewriter(routes));
server.use(router);
server.listen(3004, () => {});

router.render = (req, res) => {
  const {
    locals: { data }
  } = res;
  const { statusCode } = data;

  if (req.url.indexOf('/errors') > -1 && statusCode) {
    delete data.id;
    res.status(statusCode).jsonp({
      error: data
    });
  } else {
    res.jsonp(data);
  }
};
