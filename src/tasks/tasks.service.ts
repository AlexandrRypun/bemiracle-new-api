import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {
    }
    getAllTasks(filters: GetTaskDto): Promise<Task[]> {
        return this.taskRepository.findAllTasks(filters);
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        if (!task) {
            throw new NotFoundException();
        }
        return task;
    }

    createTask(params: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(params);
    }

    async updateTask(id: number, params: UpdateTaskDto): Promise<Task> {
        const task = await this.getTaskById(id);
        Object.keys(task).forEach(key => {
            if (params[key] !== undefined) {
                task[key] = params[key];
            }
        });
        await task.save();
        return task;
    }

    async deleteTask(id: number): Promise<void> {
        const task = await this.getTaskById(id);
        await this.taskRepository.remove(task);
    }
}
