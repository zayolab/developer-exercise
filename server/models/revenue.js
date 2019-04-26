'use strict';
module.exports = (sequelize, DataTypes) => {
  const Revenue = sequelize.define('Revenue', {
    name: DataTypes.STRING,
    oneTime: DataTypes.INTEGER,
    monthly: DataTypes.INTEGER
  }, {});
  
  return Revenue;
};