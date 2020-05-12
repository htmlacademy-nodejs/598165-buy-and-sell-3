'use strict';

const {Router} = require(`express`);
const {validationResult} = require(`express-validator`);

const HttpCode = require(`../../../constants`).HttpCode;
const offers = require(`../models/offers`);
const {offerValidator, commentValidator} = require(`./validators`);

const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  const allOffers = await offers.getAll();
  if (allOffers) {
    res.json(allOffers);
  } else {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`error`);
  }
});

offersRouter.get(`/:offerId`, async (req, res) => {
  try {
    const offer = await offers.getOffer(req.params.offerId);

    if (!offer) {
      console.log(HttpCode.NOT_FOUND);
      res.status(HttpCode.NOT_FOUND).send(`Offer not found`);
    } else {
      res.json(offer);
    }
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

offersRouter.post(`/`, offerValidator, async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpCode.BAD_REQUEST).json({errors: errors.array()});
  }

  try {
    const newOffers = await offers.addOffer(req.body);
    return res.status(HttpCode.CREATED).send(newOffers);
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

offersRouter.put(`/:offerId`, offerValidator, async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpCode.BAD_REQUEST).json({errors: errors.array()});
  }

  try {
    const newOffer = await offers.updateOffer(req.params.offerId, req.body);
    return res.status(HttpCode.CREATED).send(newOffer);
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});


offersRouter.delete(`/:offerId`, async (req, res) => {
  try {
    res.send(await offers.deleteOffer(req.params.offerId));
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

offersRouter.get(`/:offerId/comments`, async (req, res) => {
  try {
    res.send(await offers.getAllComments(req.params.offerId));
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

offersRouter.post(`/:offerId/comments`, commentValidator, async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpCode.BAD_REQUEST).json({errors: errors.array()});
  }

  try {
    const newOffer = await offers.addComment(req.params.offerId, req.body);
    return res.status(HttpCode.CREATED).send(newOffer);
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  try {
    const {offerId, commentId} = req.params;
    res.send(await offers.deleteComment(offerId, commentId));
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }

});

module.exports = offersRouter;
