import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
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
  @Post()
  create(@Body() task: CreateTaskDto) {
    return this.tasksService.create(task);
  }
}
