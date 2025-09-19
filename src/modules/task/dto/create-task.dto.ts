import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskSeverity, TaskStatus } from '../task.enums';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Название обязательно' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Описание обязательно' })
  description: string;

  @IsEnum(TaskSeverity, {
    message: `severity должен быть одним из: ${Object.values(TaskSeverity)}`,
  })
  severity: TaskSeverity;

  @IsEnum(TaskStatus, {
    message: `status должен быть одним из: ${Object.values(TaskStatus)}`,
  })
  status: TaskStatus;
}
