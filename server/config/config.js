const dotenv = require('dotenv');

dotenv.config();
const configuration = {
  development: {
    url: process.env.DEV_DBURL,
    dialect: 'postgres',
    log: false
  },
  test: {
    url: process.env.TEST_DBURL,
    dialect: 'postgres',
    log: false
  },
  travis: {
    url: 'postgres://postgres@localhost:5432/doc_man_test',
    dialect: 'postgres',
    log: false
  }
};

module.exports = configuration[process.env.NODE_ENV || 'development'];

