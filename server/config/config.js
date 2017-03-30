const dotenv = require('dotenv');
dotenv.config();

// const config = {
//   development: {
//     username: 'andeladeveloper',
//     password: '',
//     database: 'doc-man',
//     host: '127.0.0.1',
//     port: 5432,
//     dialect: 'postgres'
//   }
// };
// const environment = process.env.NODE_ENV ? `_${process.env.NODE_ENV}` : '';
const config = {
  development: {
    // database: process.env.DB_NAME,
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS,
    url: process.env.DEV_DBURL,
    dialect: 'postgres',
    log: false
  }
};

module.exports = config.development;

