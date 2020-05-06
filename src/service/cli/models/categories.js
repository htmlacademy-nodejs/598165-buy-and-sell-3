'use strict';

const CATEGORIES_FILE = require(`../../../constants`).CATEGORIES_FILE;
const readFile = require(`../../../utils`).readFile;

const categories = {
  getAll: async () => {
    try {
      return await readFile(CATEGORIES_FILE)
        .then((data) => data.split(`\n`));
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = categories;
