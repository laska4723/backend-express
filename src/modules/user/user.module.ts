import { ContainerModule } from 'inversify';
import { UserController } from './user.controller';
import { UserService } from './user.service';

export const UserModule = new ContainerModule(({ bind }) => {
  bind(UserController).toSelf().inSingletonScope();
  bind(UserService).toSelf().inSingletonScope();
});
