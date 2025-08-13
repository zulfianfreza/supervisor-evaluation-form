const http = require('http');
const { exec } = require('child_process');
const { promisify } = require('util');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { sequelize } = require('./database/models');

const execAsync = promisify(exec);

async function runMigrations() {
  try {
    logger.info('Running database migrations...');
    const result = await execAsync('npm run migrate');

    // Check for any warnings but ignore the "nothing to migrate" message
    if (result.stderr && !result.stderr.includes('Nothing to migrate')) {
      logger.warn('Migration warnings:', result.stderr);
    }

    logger.info('Migrations completed successfully');
    if (result.stdout) {
      logger.info(result.stdout);
    }

    return true;
  } catch (err) {
    logger.error('Migration failed:', err.message);
    throw err;
  }
}

async function runSeeders() {
  try {
    logger.info('Checking database status...');

    const result = await sequelize.query('SELECT COUNT(*) as count FROM questions', {
      type: sequelize.QueryTypes.SELECT,
    });

    const questionCount = parseInt(result[0].count, 10);
    logger.info(`Database contains ${questionCount} questions`);

    if (questionCount > 0) {
      logger.info('Database already populated, skipping seed');
      return true;
    }

    logger.info('Empty database detected, running seeders...');
    const seedResult = await execAsync('npm run seed');

    if (seedResult.stderr) {
      logger.warn('Seeder warnings:', seedResult.stderr);
    }

    logger.info('Database seeding completed');
    if (seedResult.stdout) {
      logger.info(seedResult.stdout);
    }

    const [finalCount] = await sequelize.query('SELECT COUNT(*) as count FROM questions', {
      type: sequelize.QueryTypes.SELECT,
    });

    logger.info(`Successfully seeded ${finalCount.count} questions`);
    return true;
  } catch (err) {
    logger.error('Seeding process failed:', err.message);
    throw err;
  }
}

const server = http.createServer(app);

async function startServer() {
  await runMigrations();
  await runSeeders();

  server.listen(config.port);

  server.on('error', (e) => {
    logger.error(e);
    process.exit(1);
  });

  server.on('listening', () => {
    logger.info(`listening on: ${config.port}`);
  });
}

startServer();
