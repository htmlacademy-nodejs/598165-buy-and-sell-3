'use strict';

const fs = require(`fs`).promises;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [shuffled[i], shuffled[randomPosition]] = [shuffled[randomPosition], shuffled[i]];
  }

  return shuffled;
};

const readFile = async (path) => {
  try {
    return await fs.readFile(path, `utf8`);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getRandomInt,
  shuffle,
  readFile,
};
