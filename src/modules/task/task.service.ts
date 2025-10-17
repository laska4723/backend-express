import { injectable } from 'inversify';
import { TaskEntity } from '../../database/entities/task.entity';
import { NotFoundException } from '../../exceptions';
import logger from '../../logger';
import { CreateTaskDto, FindAllTasksDto } from './dto';

@injectable()
export class TaskService {
  async create(dto: CreateTaskDto) {
    logger.info(`Создание новой задачи "${dto.title}"`);

    return await TaskEntity.create({
      title: dto.title,
      description: dto.description,
      severity: dto.severity,
      status: dto.status,
    });
  }

  async getList(dto: FindAllTasksDto) {
    logger.info(`Чтение списка задач`);

    // let where: WhereOptions = {};

    // if (dto.search) {
    //   const search = `%${dto.search}%`;
    //   where[Op.or] = [{ title: { [Op.like]: search } }, { description: { [Op.like]: search } }];
    //  }

    const { rows, count } = await TaskEntity.findAndCountAll({
      limit: dto.limit,
      offset: dto.offset,
      order: [[dto.sortBy, dto.sortDirection]],
    });

    return { total: count, data: rows };
  }

  async getOne(id: TaskEntity['id']) {
    logger.info(`Чтение задачи по id=${id}`);

    const task = await TaskEntity.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with id [${id}] not exist`);
    }

    return task;
  }

  async updateOne(id: TaskEntity['id'], dto: CreateTaskDto) {
    logger.info(`Обновление задачи по id=${id}`);

    const task = await this.getOne(id);

    await task.update(dto);

    return task;
  }

  async deleteOne(id: TaskEntity['id']) {
    logger.info(`Удаление задачи по id=${id}`);

    const task = await this.getOne(id);

    await task.destroy();

    return task;
  }
}
