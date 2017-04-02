import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configuration from '../../../server/config/config';

const config = configuration.test;

const basename = path.basename(module.filename);
const db = {};
const sequelize = new Sequelize(config.url, config);


fs
  .readdirSync(path.join(__dirname, '../../../server/models'))
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize
    .import(path.join(path.join(__dirname, '../../../server/models'), file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
