require('dotenv').config();
const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: 2,
      username: 'admin',
      firstname: 'admin',
      lastname: 'admin',
      email: 'admin@admin.com',
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD,
       bcrypt.genSaltSync()),
      RoleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: 'test@test.com',
      password: bcrypt.hashSync('userPassword',
       bcrypt.genSaltSync()),
      RoleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync(process.env.USER_PASSWORD,
       bcrypt.genSaltSync()),
      RoleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync(process.env.USER_PASSWORD,
       bcrypt.genSaltSync()),
      RoleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', {
      id: [2, 3, 4, 5]
    });
  }
};
