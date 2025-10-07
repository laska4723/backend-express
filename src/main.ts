import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { Container } from 'inversify';
import { logRoutes } from './bootstrap';
import { appConfig } from './config';
import { connectToPostgres } from './database';
import { NotFoundException } from './exceptions';
import logger from './logger';
import { errorHandler, logMiddleware } from './middlewares';
import { DepartmentController } from './modules/department/department.controller';
import { DepartmentModule } from './modules/department/department.module';
import { TaskController } from './modules/task/task.controller';
import { TaskModule } from './modules/task/task.module';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';

const bootstrap = async () => {
  await connectToPostgres();
  const appContainer = new Container();
  appContainer.loadSync(DepartmentModule, UserModule, TaskModule);

  const server = express();

  server.use(express.json()); // Парсер тела в формате json

  server.use(logMiddleware); // Логирование запросов

  const departmentController = appContainer.get(DepartmentController);
  const taskController = appContainer.get(TaskController);
  const userController = appContainer.get(UserController);

  server.use('/department', departmentController.router);
  server.use('/user', userController.router);
  server.use('/task', taskController.router);

  server.use((req, res, next) => {
    next(new NotFoundException());
  });

  server.use(errorHandler); // Обработчик ошибок

  server.listen(appConfig.port, () => {
    logger.info(`Server started on port ${appConfig.port}`);
  });

  logRoutes(server);
};

bootstrap();
