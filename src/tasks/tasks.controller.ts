import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Public route: list all tasks
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // Protected route: create a new task (requires JWT)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() task: CreateTaskDto) {
    return this.tasksService.create(task);
  }
}
