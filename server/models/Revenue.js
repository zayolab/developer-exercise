const { sequelize, Sequelize } = require("../database")
const { Model } = Sequelize

class Revenue extends Model {}
Revenue.init(
  {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    one_time: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    monthly: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "revenue",
    tableName: "revenue",
    underscored: true
  }
)

module.exports = Revenue
