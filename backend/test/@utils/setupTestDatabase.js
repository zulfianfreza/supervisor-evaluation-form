const db = require('../../src/database/models');

const setupTestDB = () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    jest.clearAllTimers();
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
};

module.exports = setupTestDB;
