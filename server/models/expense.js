'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    name: DataTypes.STRING,
    oneTime: DataTypes.INTEGER,
    monthly: DataTypes.INTEGER
  }, {});
  
  return Expense;
};