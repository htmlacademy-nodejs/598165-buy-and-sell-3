'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => res.render(`offers/add`));
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));
offersRouter.get(`/category/:id`, (req, res) => res.render(`offers/category`));
offersRouter.get(`/edit/:id`, (req, res) => res.render(`offers/edit`));

module.exports = offersRouter;
