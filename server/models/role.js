export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: {
      type: DataTypes.STRING,
      defaultValue: 'regular',
      allowNull: false,
      validate: {
        isIn: [['admin', 'regular']]
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User);
      }
    }
  });
  return Role;
};
