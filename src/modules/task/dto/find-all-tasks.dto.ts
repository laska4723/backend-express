import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

enum SortBy {
  id = 'id',
  title = 'title',
  description = 'description',
  createdAt = 'createdAt',
}

export class FindAllTasksDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit: number = 100;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  offset: number = 0;

  @IsOptional()
  @IsString()
  search?: string;

  @IsEnum(SortBy)
  @IsOptional()
  sortBy: SortBy = SortBy.createdAt;

  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection: SortDirection = SortDirection.desc;
}
