module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'test',
        email: 'example@example.com',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};
