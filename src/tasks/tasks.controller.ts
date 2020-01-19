import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    HttpCode,
    Query,
    UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskValidation } from './pipes/task-validation.pipe';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getAllTasks(
        @Query(ValidationPipe) filters: GetTaskDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        return this.tasksService.getAllTasks(filters, user);
    }

    @Get(':id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() params: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.createTask(params, user);
    }

    @Patch(':id')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body(TaskValidation) params: UpdateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
      return this.tasksService.updateTask(id, params, user);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }
}
