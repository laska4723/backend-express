import { inject, injectable } from 'inversify';
import { Op, WhereOptions } from 'sequelize';
import { allTaskCacheKeys, oneTaskCacheKey } from '../../cache/cache.keys';
import { CacheService } from '../../cache/cache.service';
import { TaskEntity } from '../../database/entities/task.entity';
import { NotFoundException } from '../../exceptions';
import logger from '../../logger';
import { CreateTaskDto, FindAllTasksDto } from './dto';

@injectable()
export class TaskService {
  constructor(@inject(CacheService) private readonly cacheService: CacheService) {}
  async create(dto: CreateTaskDto) {
    logger.info(`Создание новой задачи "${dto.title}"`);

    const task = await TaskEntity.create({
      title: dto.title,
      description: dto.description,
      severity: dto.severity,
      status: dto.status,
    });

    return task;
  }

  async getList(dto: FindAllTasksDto) {
    logger.info(`Чтение списка задач`);

    const AllCacheKey = allTaskCacheKeys(dto);

    const cache = await this.cacheService.redis.get(AllCacheKey);

    if (cache) {
      return JSON.parse(cache);
    }

    let where: WhereOptions = {};

    if (dto.search) {
      const search = `%${dto.search}%`;
      where = {
        [Op.or]: [{ title: { [Op.iLike]: search } }, { description: { [Op.iLike]: search } }],
      };
    }

    const tasks = await TaskEntity.findAndCountAll({
      where,
      limit: dto.limit,
      offset: dto.offset,
      order: [[dto.sortBy, dto.sortDirection]],
    });

    const result = {
      total: tasks.count,
      data: tasks.rows.map((task) => task.toJSON()),
    };

    await this.cacheService.redis.set(AllCacheKey, JSON.stringify(result), {
      expiration: { type: 'EX', value: 3600 },
    });

    return result;
  }

  async getOne(id: TaskEntity['id']) {
    logger.info(`Чтение задачи по id=${id}`);

    const cacheKey = oneTaskCacheKey(id);

    const cache = await this.cacheService.redis.get(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }

    const task = await TaskEntity.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException();
    }

    await this.cacheService.redis.set(cacheKey, JSON.stringify(task), {
      expiration: { type: 'EX', value: 3600 },
    });

    return task;
  }

  async updateOne(id: TaskEntity['id'], dto: CreateTaskDto) {
    logger.info(`Обновление задачи по id=${id}`);

    const task = await this.getOne(id);

    await task.update(dto);
    await task.reload();

    const cacheKey = oneTaskCacheKey(id);

    const cached = await this.cacheService.redis.get(cacheKey);

    if (cached !== null) {
      await this.cacheService.redis.set(cacheKey, JSON.stringify(task), { expiration: { type: 'EX', value: 3600 } });
    }

    return task;
  }

  async deleteOne(id: TaskEntity['id']) {
    logger.info(`Удаление задачи по id=${id}`);

    const task = await this.getOne(id);

    if (!task) {
      throw new NotFoundException();
    }

    await task.destroy();

    const cacheKey = oneTaskCacheKey(id);

    await this.cacheService.redis.del(cacheKey);

    return task;
  }
}
