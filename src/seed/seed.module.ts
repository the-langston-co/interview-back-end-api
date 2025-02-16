import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.entity';
import { SeedService } from './seed.service';
import { Task } from '../tasks/tasks.entity';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task]), UsersModule, TasksModule],
  providers: [SeedService],
})
export class SeedModule {}
