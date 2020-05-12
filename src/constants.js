'use strict';

module.exports.CATEGORIES_FILE = `./data/categories.txt`;
module.exports.MOCK_FILE = `mocks.json`;

module.exports.DEFAULT_COMMAND = `--help`;
module.exports.USER_ARGV_INDEX = 2;
module.exports.ExitCode = {
  error: 1,
  success: 0,
};
module.exports.HttpCode = {
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};
