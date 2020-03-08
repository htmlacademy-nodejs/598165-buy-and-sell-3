'use strict';

const express = require(`express`);
const offersRouter = require(`./routes/offers`);
const myRouter = require(`./routes/my`);

const DEFAULT_PORT = 8000;

const app = express();
app.use(`/css`, express.static(`./markup/css`));
app.use(`/img`, express.static(`./markup/img`));
app.use(`/js`, express.static(`./markup/js`));

app.set(`views`, `./templates`);
app.set(`view engine`, `pug`);

app.get(`/`, (req, res) => res.render(`main`, {}));
app.get(`/register`, (req, res) => res.render(`user/sign-up`));
app.get(`/login`, (req, res) => res.render(`user/login`));
app.get(`/search`, (req, res) => res.render(`search`));

app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);

app.use((req, res) => {
  res.status(404);
  res.render(`errors/404`);
});

app.use((req, res) => {
  res.status(500);
  res.render(`errors/500`);
});

app.listen(DEFAULT_PORT, () => {
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`);
});
