import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { BadRequestException } from '../exceptions';

export const validate = <T extends object, V>(cls: ClassConstructor<T>, plain: V): T => {
  const dto = plainToInstance<T, V>(cls, plain);
  const errors = validateSync(dto, { whitelist: true, stopAtFirstError: true });

  if (errors.length) {
    const [{ constraints }] = errors;

    if (constraints) {
      throw new BadRequestException(Object.values(constraints)[0]);
    }

    throw new BadRequestException('Unknown validation error');
  }

  return dto;
};
