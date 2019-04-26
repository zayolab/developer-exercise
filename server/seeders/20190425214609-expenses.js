'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Expenses', [
      {
        name: 'Expense 1',
        oneTime: 500,
        monthly: 20.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Expense 2',
        oneTime: 200,
        monthly: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Expenses', null, {});
  }
};
