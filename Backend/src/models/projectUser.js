'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project_User.init({
    projectID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'project_User',
  });
  return project_User;
};