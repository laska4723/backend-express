import express from 'express';
import { logRoutes } from './bootstrap';
import { logger } from './logger';
import { taskRouter } from './modules/task/task.router';

const server = express();
const port = 2000;

server.use(express.json());

server.use('/task', taskRouter);

server.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

logRoutes(server);
