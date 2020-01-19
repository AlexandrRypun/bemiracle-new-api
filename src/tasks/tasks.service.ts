import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {
    }
    getAllTasks(filters: GetTaskDto, user: User): Promise<Task[]> {
        return this.taskRepository.findAllTasks(filters, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const task = await this.taskRepository.findOne({ id, userId: user.id });
        if (!task) {
            throw new NotFoundException();
        }
        return task;
    }

    createTask(params: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(params, user);
    }

    async updateTask(id: number, params: UpdateTaskDto, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        Object.keys(task).forEach(key => {
            if (params[key] !== undefined) {
                task[key] = params[key];
            }
        });
        await task.save();
        return task;
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const task = await this.getTaskById(id, user);
        await this.taskRepository.remove(task);
    }
}
