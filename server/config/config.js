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
  }
};

module.exports = configuration;

