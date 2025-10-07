import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { TaskSeverity, TaskStatus } from '../../modules/task/task.enums';

@Table({ tableName: 'tasks' })
export class UserEntity extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  public id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public status: TaskStatus;

  @Column({ type: DataType.STRING, allowNull: false })
  public severity: TaskSeverity;

  @Column({ type: DataType.STRING, allowNull: false })
  public author: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public assignee: string;
}
