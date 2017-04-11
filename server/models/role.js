module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: {
      type: DataTypes.STRING,
      defaultValue: 'regular',
      allowNull: false,
      unique: true,
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User, {
          foreignKey: {
            name: 'RoleId',
          }
        });
      }
    }
  });
  return Role;
};
