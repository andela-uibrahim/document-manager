import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This username is already taken.'
      },
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
      unique: {
        msg: 'This email is already taken.'
      },
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
      type: DataTypes.STRING,
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
      },
      beforeUpdate: (user) => {
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
        User.hasMany(models.document, {
          foreignKey: 'UserId'
        });
      }
    },
    instanceMethods: {
      /**
       * verify plain password against user's hashed password
       * @method
       * @param {String} password password to be encrypted
       * @returns {Boolean} Validity of passowrd
       */
      passwordMatched(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
  });
  return User;
};
