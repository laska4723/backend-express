import { ContainerModule } from 'inversify';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

export const TaskModule = new ContainerModule(({ bind }) => {
  bind(TaskController).toSelf().inSingletonScope();
  bind(TaskService).toSelf().inSingletonScope();
});
