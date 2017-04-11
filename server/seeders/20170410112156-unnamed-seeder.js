

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      id: 1,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      role: 'regular',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', {
      id: [1, 2]
    });
  }
};
