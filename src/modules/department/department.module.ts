import { ContainerModule } from 'inversify';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

export const DepartmentModule = new ContainerModule(({ bind }) => {
  bind(DepartmentController).toSelf().inSingletonScope();
  bind(DepartmentService).toSelf().inSingletonScope();
});
