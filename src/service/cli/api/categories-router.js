'use strict';

const {Router} = require(`express`);

const HttpCode = require(`../../../constants`).HttpCode;
const categories = require(`../models/categories`);


const categoriesRouter = new Router();

categoriesRouter.get(`/`, async (req, res) => {
  try {
    const allCategories = await categories.getAll();

    res.json({allCategories});
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

module.exports = categoriesRouter;
