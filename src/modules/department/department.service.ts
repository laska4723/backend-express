import { injectable } from 'inversify';
import logger from '../../logger';
import { getMockDepartment } from '../../mocks';
import { CreateDepartmentBodyDto } from './dto';

@injectable()
export class DepartmentService {
  create(dto: CreateDepartmentBodyDto) {
    logger.info(`Создание нового департмента "${dto.title}"`);

    return getMockDepartment();
  }

  getList() {
    logger.info(`Чтение всех департментов`);

    return getMockDepartment();
  }

  getOne(id: number) {
    logger.info(`Чтение департмента по id=${id}`);

    return getMockDepartment();
  }

  updateOne(id: number) {
    logger.info(`Изменение департмента по id=${id}`);

    return getMockDepartment();
  }

  deleteOne(id: number) {
    logger.info(`Удаление департмента по id=${id}`);

    return getMockDepartment();
  }
}
