'use strict';
const express = require(`express`);
const offersRouter = require(`./routes/offers`);
const myRouter = require(`./routes/my`);

const DEFAULT_PORT = 8000;
const app = express();

app.get(`/`, (req, res) => {
  res.send(`/`);
});
app.get(`/register`, (req, res) => res.send(`/register`));
app.get(`/login`, (req, res) => res.send(`/login`));
app.get(`/search`, (req, res) => res.send(`/search`));
app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);

app.listen(DEFAULT_PORT,
    () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
