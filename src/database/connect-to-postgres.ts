import { Sequelize } from 'sequelize-typescript';
import logger from '../logger';
import { UserEntity } from './entities/user.entity';

export const connectToPostgres = async () => {
  const connection = new Sequelize({
    dialect: 'postgres',
    logging: false,

    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgrespassword',
    database: 'backend',
  });

  connection.addModels([UserEntity]);

  try {
    await connection.authenticate();
  } catch (e) {
    logger.error("Can't connect to Postgres");
    logger.error(e);

    throw e;
  }

  await connection.sync({ alter: true });

  logger.info(`Connected to Postgres`);
};
