import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskSeverity, TaskStatus } from '../task.enums';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Название обязательно' })
  title?: string;

  @IsString()
  @IsNotEmpty({ message: 'Описание обязательно' })
  @IsOptional()
  description?: string;

  @IsEnum(TaskSeverity, {
    message: `severity должен быть одним из: ${Object.values(TaskSeverity)}`,
  })
  @IsOptional()
  severity?: TaskSeverity;

  @IsEnum(TaskStatus, {
    message: `status должен быть одним из: ${Object.values(TaskStatus)}`,
  })
  @IsOptional()
  status?: TaskStatus;
}
