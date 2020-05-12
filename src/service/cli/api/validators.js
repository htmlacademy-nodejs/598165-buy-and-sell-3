'use strict';

const {check} = require(`express-validator`);

const offerValidator = [
  check(`type`)
    .not().isEmpty()
    .trim().escape()
    .withMessage(`The field is required`),
  check(`title`)
    .not().isEmpty().withMessage(`The field is required`)
    .trim().escape()
    .isLength({min: 10, max: 100})
    .withMessage(`The field has to have the min length of 10 and max of 100`),
  check(`description`)
    .not().isEmpty().withMessage(`The field is required`)
    .trim().escape()
    .isLength({min: 50, max: 1000})
    .withMessage(`The field has to have the min length of 50 and max of 1000`),
  check(`sum`)
    .not().isEmpty().withMessage(`The field is required`)
    .escape().isInt({min: 100}).withMessage(`The value has to be more than 100`),
  check(`picture`)
    .not().isEmpty().withMessage(`The field is required`)
    .trim().escape(),
  check(`category`)
    .not().isEmpty().withMessage(`The field is required`)
    .trim().escape(),
];

const commentValidator = [
  check(`text`)
    .not().isEmpty().withMessage(`The field is required`)
    .isLength({min: 20})
    .withMessage(`The field has to be at least 20 characters long`)
];

module.exports = {
  offerValidator,
  commentValidator,
};
