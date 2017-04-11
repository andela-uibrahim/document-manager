const faker = require('faker');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('documents', [{
      id: 13,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'public',
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 14,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'private',
      UserId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 15,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'role',
      UserId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 16,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'public',
      UserId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 17,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'private',
      UserId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 18,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'role',
      UserId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('documents', {
      id: [13, 14, 15, 16, 17, 18]
    });
  }
};
