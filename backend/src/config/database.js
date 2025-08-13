const config = require('./config');

module.exports = {
  development: {
    username: config.database.user,
    password: config.database.password,
    database: `${config.database.name}`,
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: config.database.user,
    password: config.database.password,
    database: `${config.database.name}`,
    host: config.database.host,
    port: config.database.port,
    logging: false,
    dialect: 'postgres',
  },
  production: {
    username: config.database.user,
    password: config.database.password,
    database: `${config.database.name}`,
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres',
  },
};
