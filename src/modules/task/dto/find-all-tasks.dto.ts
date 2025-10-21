import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortDirection } from '../../../shared';
import { TaskSortBy } from '../task.enums';

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

  @IsEnum(TaskSortBy)
  @IsOptional()
  sortBy: TaskSortBy = TaskSortBy.createdAt;

  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection: SortDirection = SortDirection.desc;
}
