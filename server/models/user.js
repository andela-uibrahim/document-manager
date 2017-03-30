import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: ' username field is empty'
        }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name field is empty'
        },
        is: {
          args: /^[a-z]+$/i,
          msg: 'name should contain only letters'
        }

      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'lastname field is empty'
        },
        is: {
          args: /^[a-z]+$/i,
          msg: 'name should contain only letters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email field is empty'
        },
        isEmail: {
          args: true,
          msg: 'input correct email field'
        }
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email field is empty'
        },
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('password should be atleast 8 characters');
          }
        },
      }
    },

  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    classMethods: {
      associate: (models) => {
        User.belongsTo(models.Role, {
          foreignKey: {
            name: 'RoleId',
            allowNull: false
          }
        });
        User.hasMany(models.Document, {
          foreignKey: 'UserId'
        });
      }
    }
  });
  return User;
};
