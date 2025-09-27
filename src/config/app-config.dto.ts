import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class AppConfigDto {
  @Type(() => Number)
  @IsNumber()
  port: number;
}
