'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {getRandomInt, shuffle} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_CATEGORIES = 3;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;


const OfferType = {
  offer: `offer`,
  sale: `sale`,
};


const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16
};

const getPictureFileName = (random) => {
  return (`item${random < 10 ? `0` + random : random}.jpg`);
};

const getCategories = (count, categories) => {
  return shuffle(categories).slice(0, count);
};

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    title: titles[getRandomInt(0, titles.length - 1)],
    description: shuffle(sentences).slice(0, getRandomInt(1, 5)).join(` `),
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    category: getCategories(getRandomInt(1, MAX_CATEGORIES), categories),
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.errror(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: `--generate`,

  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer < MAX_COUNT) {
      const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));
      try {
        await fs.writeFile(FILE_NAME, content);
        console.info(chalk.green(`Operation success. File created.`));
      } catch (err) {
        console.error((chalk.red(`Can't write data to file...`)));
        process.exit(1);
      }
    } else {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(1);
    }
  }
};
