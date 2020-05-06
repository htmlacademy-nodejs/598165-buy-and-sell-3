'use strict';

const MOCK_FILE = require(`../../../constants`).MOCK_FILE;
const readFile = require(`../../../utils`).readFile;

const search = {
  getAll: async () => {
    try {
      return await readFile(MOCK_FILE)
        .then((data) => JSON.parse(data));
    } catch (error) {
      throw new Error(error);
    }
  },
  getMatches: async (query) => {

    const all = await search.getAll();
    const regExp = new RegExp(query, `gi`);
    const result = [];

    all.filter((item) => {
      if (item.title.match(regExp)) {
        result.push(item);
      }
    });
    return result;
  }
};

module.exports = search;
