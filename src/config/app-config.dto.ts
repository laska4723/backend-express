import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AppConfigDto {
  @Type(() => Number)
  @IsNumber()
  port: number;

  @Type(() => Number)
  @IsNumber()
  pgPort: number;

  @IsString()
  @IsNotEmpty()
  pgHost: string;

  @IsString()
  @IsNotEmpty()
  pgUsername: string;

  @IsString()
  @IsNotEmpty()
  pgPassword: string;

  @IsString()
  @IsNotEmpty()
  pgDatabase: string;

  @IsString()
  @IsNotEmpty()
  redisUrl: string;
}
