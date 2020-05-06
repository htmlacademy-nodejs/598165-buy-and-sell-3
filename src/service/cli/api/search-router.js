'use strict';

const {Router} = require(`express`);

const search = require(`../models/search`);
const HttpCode = require(`../../../constants`).HttpCode;

const searchRouter = new Router();

searchRouter.get(`/`, async (req, res) => {

  const query = req.query.q.trim();

  try {
    const result = await search.getMatches(query);
    return res.json(result);
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }

});

module.exports = searchRouter;
