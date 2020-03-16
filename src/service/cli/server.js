'use strict';
const express = require(`express`);
const offersRouter = require(`./routes/offers`);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  run(args) {
    const [portArg] = args;
    const port = parseInt(portArg, 10) || DEFAULT_PORT;

    const httpServer = express();

    httpServer.use(express.json());

    httpServer.use(`/offers`, offersRouter);

    httpServer.listen(port, () => console.log(`Принимаю подключения на порт ${port}`));
  }

};
