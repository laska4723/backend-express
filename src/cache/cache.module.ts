import { ContainerModule } from 'inversify';
import { CacheService } from './cache.service';

export const CacheModule = new ContainerModule(({ bind }) => {
  bind(CacheService).toSelf().inSingletonScope();
});
