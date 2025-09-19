import 'reflect-metadata';
import express from 'express';
import { logRoutes } from './bootstrap';
import { logger } from './logger';
import { errorHandler, logMiddleware } from './middlewares';
import { departmentRouter } from './modules/department/department.router';
import { taskRouter } from './modules/task/task.router';
import { userRouter } from './modules/user/user.router';

const server = express();

server.use(express.json()); // Парсер тела в формате json

server.use(logMiddleware); // Логирование запросов

server.use('/department', departmentRouter); // Обработчики с нашей логикой
server.use('/user', userRouter); // Обработчики с нашей логикой
server.use('/task', taskRouter); // Обработчики с нашей логикой

server.use(errorHandler); // Обработчик ошибок

const port = 2000;

server.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

logRoutes(server);
