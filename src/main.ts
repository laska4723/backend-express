import 'reflect-metadata';
import express from 'express';
import { Container } from 'inversify';
import { logRoutes } from './bootstrap';
import { appConfig } from './config';
import { NotFoundException } from './exceptions';
import logger from './logger';
import { errorHandler, logMiddleware } from './middlewares';
import { DepartmentController } from './modules/department/department.controller';
import { DepartmentModule } from './modules/department/department.module';
import { departmentRouter } from './modules/department/department.router';
import { TaskController } from './modules/task/task.controller';
import { TaskModule } from './modules/task/task.module';
import { taskRouter } from './modules/task/task.router';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { userRouter } from './modules/user/user.router';

const bootstrap = () => {
  const appContainer = new Container();
  appContainer.loadSync(DepartmentModule, UserModule, TaskModule);

  const server = express();

  server.use(express.json()); // Парсер тела в формате json

  server.use(logMiddleware); // Логирование запросов

  const departmentController = appContainer.get(DepartmentController);
  const taskController = appContainer.get(TaskController);
  const userController = appContainer.get(UserController);

  server.use('/department', departmentRouter); // Обработчик с нашей логикой
  server.use('/user', userRouter); // Обработчик с нашей логикой
  server.use('/task', taskRouter); // Обработчик с нашей логикой
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
