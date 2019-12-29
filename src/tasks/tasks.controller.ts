import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, HttpCode, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskValidation } from './pipes/task-validation.pipe';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getAllTasks(@Query(ValidationPipe) filters: GetTaskDto): Promise<Task[]> {
        return this.tasksService.getAllTasks(filters);
    }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() params: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(params);
    }

    @Patch(':id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body(TaskValidation) params: UpdateTaskDto): Promise<Task> {
      return this.tasksService.updateTask(id, params);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }
}
