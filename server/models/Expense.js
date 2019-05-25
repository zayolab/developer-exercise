const { sequelize, Sequelize } = require("../database");
const { Model } = Sequelize;

class Expense extends Model {}
Expense.init(
  {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    one_time: {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false
    },
    monthly: {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "expense",
    tableName: "expenses",
    underscored: true
  }
);

module.exports = Expense;
