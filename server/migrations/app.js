const Sequelize = require('sequelize');

const connection = new Sequelize('doc-man', 'root', 'Kratus043', {
  dialect: 'postgres'
});
const Article = connection.define('article', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});
