import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TaskSeverity, TaskStatus } from '../enums';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Описание обязательно' })
  description: string;

  @IsEnum(TaskSeverity, { message: 'severity должен быть одним из: low, medium, high' })
  severity: TaskSeverity;

  @IsEnum(TaskStatus, { message: 'status должен быть одним из: open, in_progress, done' })
  status: TaskStatus;

  @IsNumber()
  assigneeId: number;
}
