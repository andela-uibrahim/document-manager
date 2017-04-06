

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Roles',
      'role',
      {
        type: Sequelize.STRING,
        unique: true
      }
    );
  },

  down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
