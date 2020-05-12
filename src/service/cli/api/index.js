'use strict';

const {Router} = require(`express`);

const categoriesRouter = require(`./categories-router`);
const offersRouter = require(`./offers-router`);
const searchRouter = require(`./search-router`);

const apiRouter = new Router();

apiRouter.use(`/categories`, categoriesRouter);
apiRouter.use(`/offers`, offersRouter);
apiRouter.use(`/search`, searchRouter);

module.exports = apiRouter;
