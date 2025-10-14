import { injectable } from 'inversify';
import { Op, WhereOptions } from 'sequelize';
import { TaskEntity } from '../../database/entities/task.entity';
import { NotFoundException, UnauthorizedException } from '../../exceptions';
import logger from '../../logger';
import { CreateTaskDto, FindAllTasksDto, UpdateTaskDto } from './dto';

@injectable()
export class TaskService {
  async create(dto: CreateTaskDto) {
    logger.info(`Создание новой задачи "${dto.title}"`);

    const task = await TaskEntity.create({
      title: dto.title,
      description: dto.description,
      severity: dto.severity,
      status: dto.status,
    });

    await task.save();

    return task;
  }

  async getList(dto: FindAllTasksDto) {
    logger.info(`Чтение списка задач`);

    let where: WhereOptions = {};

    if (dto.search) {
      where = {
        title: { [Op.like]: `%${dto.search}%` },
        description: { [Op.like]: `%${dto.search}%` },
      };
    }
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
      where: { id: id },
    });

    if (!task) {
      throw new NotFoundException(`Task with id [${id}] not exist`);
    }

    return task;
  }

  async updateOne(id: TaskEntity['id'], dto: UpdateTaskDto) {
    logger.info(`Обновление задачи по id=${id}`);

    const task = await TaskEntity.findOne({
      where: { id: id },
    });

    if (!task) {
      throw new NotFoundException(`Задача с id=${id} не найдена`);
    }

    task.title = dto.newTitle;
    task.description = dto.newDescription;
    task.severity = dto.newSeverity;
    task.status = dto.newStatus;

    await task.save();

    return task;
  }

  async deleteOne(id: TaskEntity['id']) {
    logger.info(`Удаление задачи по id=${id}`);

    const task = await TaskEntity.findOne({
      where: { id: id },
    });

    if (!task) {
      throw new UnauthorizedException();
    }

    await task.destroy();

    return task;
  }
}
