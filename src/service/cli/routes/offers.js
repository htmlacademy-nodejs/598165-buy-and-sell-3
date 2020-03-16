'use strict';
const {Router} = require(`express`);
const offersRouter = new Router();

const readData = () => {
  let data;
  try {
    data = require(`../../../../mocks.json`);
  } catch (e) {
    data = [];
  }
  return data;
};

offersRouter.get(`/`, (req, res) => {
  res.json(readData());
});

module.exports = offersRouter;
