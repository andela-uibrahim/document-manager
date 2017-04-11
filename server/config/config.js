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
console.log('======>>>>', process.NODE_ENV);
const q = configuration[process.env.NODE_ENV || 'development'];
console.log('======>>>>', q);

module.exports = q;

