const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const gacha = require('./routes/gacharoutes');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  gacha(app);
  return app;
};
