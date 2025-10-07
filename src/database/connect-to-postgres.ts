import { Sequelize } from 'sequelize-typescript';
import { appConfig } from '../config';
import logger from '../logger';
import { DepartmentEntity } from './entities/department.entity';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from './entities/user.entity';

export const connectToPostgres = async () => {
  const connection = new Sequelize({
    dialect: 'postgres',
    logging: false,

    port: appConfig.pgPort,
    host: appConfig.pgHost,
    username: appConfig.pgUsername,
    password: appConfig.pgPassword,
    database: appConfig.pgDatabase,
  });

  connection.addModels([UserEntity, TaskEntity, DepartmentEntity]);

  try {
    await connection.authenticate();
  } catch (e) {
    logger.error("Can't connect to Postgres");
    logger.error(e);

    throw e;
  }

  await connection.sync({ alter: true });

  logger.info('Connected to Postgres');
};
