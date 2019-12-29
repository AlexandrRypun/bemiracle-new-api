import { IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
  @IsString()
  title: string;

  @IsString()
  desc: string;

  status: TaskStatus;
}
