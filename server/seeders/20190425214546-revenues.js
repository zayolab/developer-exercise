'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Revenues', [
      {
        name: 'Item 1',
        oneTime: 100,
        monthly: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Item 2',
        oneTime: 50,
        monthly: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Item 3',
        oneTime: 25,
        monthly: 85,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Revenues', null, {});
  }
};
