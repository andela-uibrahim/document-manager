const faker = require('faker');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('documents', [{
      id: 1,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'public',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'private',
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'role',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'public',
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'private',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'role',
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('documents', {
      id: [1, 2, 3, 4, 5, 6]
    });
  }
};
