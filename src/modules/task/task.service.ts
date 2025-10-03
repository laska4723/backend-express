import { injectable } from 'inversify';
import logger from '../../logger';
import { getMockTask } from '../../mocks';
import { CreateTaskDto } from './dto';

@injectable()
export class TaskService {
  create(dto: CreateTaskDto) {
    logger.info(`Создание новой задачи "${dto.title}"`);

    return getMockTask();
  }

  getList() {
    logger.info(`Чтение списка задач`);

    return getMockTask(8);
  }

  getOne(id: number) {
    logger.info(`Чтение задачи по id=${id}`);

    return getMockTask(1);
  }

  updateOne(id: number) {
    logger.info(`Обновление задачи по id=${id}`);

    return getMockTask(1);
  }

  deleteOne(id: number) {
    logger.info(`Удаление задачи по id=${id}`);

    return getMockTask(1);
  }
}
