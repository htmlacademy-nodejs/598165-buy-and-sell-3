'use strict';
const express = require(`express`);

const HttpCode = require(`../../constants`).HttpCode;
const apiRouter = require(`./api`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(`/api`, apiRouter);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));


module.exports = {
  name: `--server`,
  run(args) {
    const [portArg] = args;
    const port = parseInt(portArg, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`);
      }
      return console.log(`Принимаю подключения на порт ${port}`);
    });
  }
};
