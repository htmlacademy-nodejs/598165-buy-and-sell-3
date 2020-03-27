'use strict';
const express = require(`express`);
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;
const HttpCode = {
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const app = express();
app.use(express.json());

app.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

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
