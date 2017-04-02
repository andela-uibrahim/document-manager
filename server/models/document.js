export default (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'title field is empty'
        }
      },
      set(value) {
        this.setDataValue('title', value.trim());
      }
    },
    content: {
      type: DataTypes.TEXT,
    },
    access: {
      defaultValue: 'private',
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['public', 'private', 'role']],
          msg: 'access can only be public, private and role'
        }
      }
    },
  }, {
    classMethods: {
      associate(models) {
        document.belongsTo(models.User, {
          foreignKey: {
            name: 'UserId',
            allowNull: false
          }
        });
      }
    }
  });
  return document;
};
