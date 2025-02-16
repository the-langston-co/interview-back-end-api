import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { User } from '../users/users.entity';
import {CreateTaskDto} from "./dto/task.dto";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find({ relations: ['user'] });
    }

    async create(dto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create(dto);
        return this.taskRepository.save(task);
    }
}