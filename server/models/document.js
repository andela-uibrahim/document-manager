export default (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    creatorId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'title field is empty'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
    },
    access: {
      defaultValue: 'private',
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return document;
};
