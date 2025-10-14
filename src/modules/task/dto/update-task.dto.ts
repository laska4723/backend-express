import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskSeverity, TaskStatus } from '../task.enums';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Название обязательно' })
  newTitle: string;

  @IsString()
  @IsNotEmpty({ message: 'Описание обязательно' })
  newDescription: string;

  @IsEnum(TaskSeverity, {
    message: `severity должен быть одним из: ${Object.values(TaskSeverity)}`,
  })
  newSeverity: TaskSeverity;

  @IsEnum(TaskStatus, {
    message: `status должен быть одним из: ${Object.values(TaskStatus)}`,
  })
  newStatus: TaskStatus;
}
