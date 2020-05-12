'use strict';

const nanoid = require(`nanoid`).nanoid;

const MOCK_FILE = require(`../../../constants`).MOCK_FILE;
const readFile = require(`../../../utils`).readFile;

const offers = {
  getAll: async () => {
    try {
      return await readFile(MOCK_FILE)
        .then((data) => JSON.parse(data));
    } catch (error) {
      throw new Error(error);
    }
  },

  getOffer: async (offerId) => {
    return await offers.getAll()
      .then((allOffers) => allOffers.find((offer) => offer.id === offerId));
  },

  addOffer: async (offerId) => {
    try {
      const allOffers = await offers.getAll();
      allOffers.push({
        id: nanoid(),
        ...offerId
      });
      return allOffers;

    } catch (error) {
      throw new Error(error);
    }
  },


  updateOffer: async (offerId, updatedData) => {
    try {
      return await offers.getOffer(offerId)
        .then((offer) => ({...offer, ...updatedData}));
    } catch (error) {
      throw new Error(error);
    }
  },


  deleteOffer: async (offerId) => {
    try {
      return await offers.getAll()
        .then((allOffers) => allOffers.filter((offer) => offer.id !== offerId));
    } catch (error) {
      throw new Error(error);
    }

  },

  getAllComments: async (offerId) => {
    try {
      return await offers.getOffer(offerId)
        .then((offer) => offer.comments);
    } catch (error) {
      throw new Error(error);
    }
  },

  addComment: async (offerId, comment) => {
    try {
      return await offers.getOffer(offerId)
        .then((offer) => {
          offer.comments.push({id: nanoid(), ...comment});
          return offer;
        });
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteComment: async (offerId, commentId) => {
    try {
      return await offers.getOffer(offerId)
        .then((offer) => {
          offer.comments = offer.comments.filter((comment) => comment.id !== commentId);
          return offer.comments;
        });
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = offers;
