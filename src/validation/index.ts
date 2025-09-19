import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { BadRequestException } from '../exceptions';

export const validate = <T extends object, V>(cls: ClassConstructor<T>, plain: V) => {
  const dto = plainToInstance(cls, plain);
  const errors = validateSync(dto, { whitelist: true, stopAtFirstError: true });
  if (errors.length) {
    const [{ constraints }] = errors;

    if (constraints) {
      throw new BadRequestException(Object.values(constraints)[0]);
    }
  }

  return dto;
};
