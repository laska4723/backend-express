import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdNumberDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
