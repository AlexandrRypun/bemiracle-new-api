import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(params: CreateTaskDto): Promise<Task> {
        const { title, desc } = params;
        const task = new Task();
        task.title = title;
        task.desc = desc;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }

    async findAllTasks(filetrs: GetTaskDto): Promise<Task[]> {
        const { search, status } = filetrs;
        const query = this.createQueryBuilder('task');
        if (search) {
            query.andWhere('task.title LIKE :search OR task.desc LIKE :search', { search: `%${search}%` });
        }
        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        const [tasks, count] = await query.getManyAndCount();

        return tasks;
    }
}
