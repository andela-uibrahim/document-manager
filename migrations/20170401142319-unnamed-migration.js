module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'documents',
      'UserId',
      {
        type: Sequelize.INTEGER,
      }
    );

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
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
