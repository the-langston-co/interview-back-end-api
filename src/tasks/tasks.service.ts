import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/task.dto';
import { ClsService } from 'nestjs-cls';
import { AppClsStore } from '../cls/cls-store';

@Injectable()
export class TasksService {
  logger = new Logger(TasksService.name);
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly clsService: ClsService<AppClsStore>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['user'] });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const userId = this.clsService.get('user_id');

    if (!userId) throw new UnauthorizedException();

    this.logger.debug(`user_id: ${userId}`);
    const task = this.taskRepository.create({ ...dto, userId });
    return this.taskRepository.save(task);
  }
}
