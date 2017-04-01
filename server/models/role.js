export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: {
      type: DataTypes.STRING,
      defaultValue: 'regular',
      allowNull: false,
      validate: {
        isIn: {
          args: [['admin', 'regular']],
          msg: 'role can only be admin or regular'
        }
      }
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